import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ForbiddenError } from "apollo-server-errors";
import { getManager, Repository } from "typeorm";
import { Likeable, LikeableType } from "../likeable/likeable.entity";
import { Track } from "../track/track.entity";
import { User } from "../user/user.entity";
import { AddTrackToPlaylist } from "./args/AddTrackToPlaylist.arg";
import { CreatePlaylistArgs } from "./args/CreatePlaylist.arg";
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
        private playlistToTrackRepository: Repository<PlaylistToTrack>
    ) {}

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

    async addTrackToPlaylist(arg: AddTrackToPlaylist, user: User) {
        const [playlist, track, latestPlaylistToTrack] = await Promise.all([
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
        ]);

        if (playlist.userId !== user.id) {
            throw new ForbiddenError("Can't add track to other's playlist");
        }

        await this.playlistToTrackRepository.save({
            playlistId: playlist.id,
            trackId: track.id,
            order: latestPlaylistToTrack ? latestPlaylistToTrack.order + 1 : 0,
        });

        return playlist;
    }
}
