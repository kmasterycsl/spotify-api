import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { paginate } from "nestjs-typeorm-paginate";
import { FindManyOptions, Like, Repository } from "typeorm";
import { GetTracksArgs } from "./args/GetTracks.args";
import { ArtistToTrack } from "../artist/artist-to-track.entity";
import { Track } from "./track.entity";
import { Pagination } from "src/shared/Pagination";
import { PlaylistToTrack } from "../playlist/playlist-to-track.entity";
import convertToCustomPagination from "src/shared/utils/convertToCustomPagination";

@Injectable()
export class TrackService {
    constructor(
        @InjectRepository(Track)
        private tracksRepository: Repository<Track>,
        @InjectRepository(ArtistToTrack)
        private artistToTrackRepository: Repository<ArtistToTrack>,
        @InjectRepository(PlaylistToTrack)
        private playlistToTrackRepository: Repository<PlaylistToTrack>
    ) {}

    find(args: GetTracksArgs): Promise<Pagination<Track>> {
        const cond: FindManyOptions<Track> = args.query
            ? {
                  where: {
                      name: Like(`%${args.query}%`),
                  },
              }
            : undefined;

        return paginate<Track>(
            this.tracksRepository,
            {
                limit: args.limit,
                page: args.page,
            },
            cond
        ).then(convertToCustomPagination);
    }

    findOneById(id: string): Promise<Track> {
        return this.tracksRepository.findOne(id);
    }

    async findByArtistId(artistId: string, args: GetTracksArgs): Promise<Pagination<Track>> {
        const artistToTracks = await paginate(this.artistToTrackRepository, args, {
            where: { artistId },
        });
        const trackIds = artistToTracks.items.map(att => att.trackId);
        const tracks = await this.tracksRepository.findByIds(trackIds);
        return new Pagination(tracks, artistToTracks.meta);
    }

    async findByPlaylistId(playlistId: string, args: GetTracksArgs): Promise<Pagination<Track>> {
        const playlistToTracks = await paginate(this.playlistToTrackRepository, args, {
            where: { playlistId },
        });
        const trackIds = playlistToTracks.items.map(att => att.trackId);
        const tracks = await this.tracksRepository.findByIds(trackIds);
        return new Pagination(tracks, playlistToTracks.meta);
    }

    async findByAlbumId(albumId: string): Promise<Track[]> {
        return this.tracksRepository.find({ albumId });
    }
}
