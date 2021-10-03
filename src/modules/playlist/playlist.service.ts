import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ForbiddenError } from "apollo-server-errors";
import { paginate } from "nestjs-typeorm-paginate";
import { Pagination } from "src/shared/Pagination";
import convertToCustomPagination from "src/shared/utils/convertToCustomPagination";
import { FindManyOptions, getManager, Like, Repository } from "typeorm";
import { GetPlaylistsInGenreArgs } from "../genre/args/GetPlaylists.args";
import { GenreToPlaylist } from "../genre/genre-to-playlist.entity";
import { Likeable, LikeableType } from "../likeable/likeable.entity";
import { Track } from "../track/track.entity";
import { User } from "../user/user.entity";
import { AddTrackToPlaylist } from "./args/AddTrackToPlaylist.arg";
import { CreatePlaylistArgs } from "./args/CreatePlaylist.arg";
import { DeletePlaylistArgs } from "./args/DeletePlaylist.arg";
import { GetPlaylistsArgs } from "./args/GetPlaylistsArgs.arg";
import { UpdatePlaylistArgs } from "./args/UpdatePlaylist.arg";
import { PlaylistToTrack } from "./playlist-to-track.entity";
import { Playlist } from "./playlist.entity";

@Injectable()
export class PlaylistService {
    constructor(
        @InjectRepository(Playlist)
        private playlistsRepository: Repository<Playlist>,
        @InjectRepository(Track)
        private tracksRepository: Repository<Track>,
        @InjectRepository(PlaylistToTrack)
        private playlistToTrackRepository: Repository<PlaylistToTrack>,
        @InjectRepository(Likeable)
        private likeableRepository: Repository<Likeable>,
        @InjectRepository(GenreToPlaylist)
        private genreToPlaylistRepository: Repository<GenreToPlaylist>
    ) {}

    find(args: GetPlaylistsArgs): Promise<Pagination<Playlist>> {
        const cond: FindManyOptions<Playlist> = args.query
            ? {
                  where: {
                      name: Like(`%${args.query}%`),
                  },
              }
            : undefined;

        return paginate<Playlist>(
            this.playlistsRepository,
            {
                limit: args.limit,
                page: args.page,
            },
            cond
        ).then(convertToCustomPagination);
    }

    async findByUserId(userId: string): Promise<Playlist[]> {
        const playlists = await this.playlistsRepository.find({
            where: {
                userId,
            },
            order: {
                createdAt: "DESC",
            },
        });
        return playlists;
    }

    findOneById(id: string): Promise<Playlist> {
        return this.playlistsRepository.findOne(id);
    }

    getTracksCount(playlistId: string): Promise<number> {
        return this.playlistToTrackRepository.count({ playlistId });
    }

    async createPlaylist(arg: CreatePlaylistArgs, user: User) {
        const playlist = await getManager().transaction(async txnEntityManager => {
            // Create playlist
            const playlist = new Playlist();
            playlist.name = arg.name;
            playlist.userId = user.id;
            await txnEntityManager.save(playlist);

            // Auto like own playlist
            const likeable = new Likeable();
            likeable.likeableId = playlist.id;
            likeable.likeableType = LikeableType.PLAYLIST;
            likeable.userId = user.id;
            await txnEntityManager.save(likeable);

            return playlist;
        });

        return playlist;
    }

    async updatePlaylist(arg: UpdatePlaylistArgs, user: User) {
        const playlist = await this.playlistsRepository.findOneOrFail(arg.id);

        if (playlist.userId !== user.id) {
            throw new ForbiddenException();
        }

        return this.playlistsRepository.save({
            ...playlist,
            name: arg.name,
        });
    }

    async deletePlaylist(arg: DeletePlaylistArgs, user: User) {
        const playlist = await this.playlistsRepository.findOneOrFail(arg.id);

        if (playlist.userId !== user.id) {
            throw new ForbiddenException();
        }

        await getManager().transaction(async txnEntityManager => {
            await txnEntityManager.delete(Playlist, playlist.id);

            await txnEntityManager.delete(Likeable, [
                {
                    likeableId: playlist.id,
                    likeableType: LikeableType.PLAYLIST,
                },
            ]);
        });

        return playlist;
    }

    async addTrackToPlaylist(arg: AddTrackToPlaylist, user: User) {
        const [playlist, track, latestPlaylistToTrack, existingPlaylistToTrack] = await Promise.all(
            [
                this.playlistsRepository.findOneOrFail(arg.playlistId),
                this.tracksRepository.findOneOrFail(arg.trackId),
                this.playlistToTrackRepository.findOne(
                    {
                        playlistId: arg.playlistId,
                    },
                    {
                        order: {
                            order: "DESC",
                        },
                    }
                ),
                this.playlistToTrackRepository.findOne({
                    playlistId: arg.playlistId,
                    trackId: arg.trackId,
                }),
            ]
        );

        if (playlist.userId !== user.id) {
            throw new ForbiddenError("Can't add track to other's playlist");
        }

        if (existingPlaylistToTrack) {
            return playlist;
        }

        await this.playlistToTrackRepository.save({
            playlistId: playlist.id,
            trackId: track.id,
            order: latestPlaylistToTrack ? latestPlaylistToTrack.order + 1 : 0,
        });

        return playlist;
    }

    async findByGenreId(
        genreId: string,
        args: GetPlaylistsInGenreArgs
    ): Promise<Pagination<Playlist>> {
        const genreToPlaylists = await paginate(this.genreToPlaylistRepository, args, {
            where: { genreId },
        });
        const playlistIds = genreToPlaylists.items.map(att => att.playlistId);
        const playlists = await this.playlistsRepository.findByIds(playlistIds);
        return new Pagination(playlists, genreToPlaylists.meta);
    }
}
