import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { paginate } from "nestjs-typeorm-paginate";
import { Pagination } from "src/shared/Pagination";
import convertToCustomPagination from "src/shared/utils/convertToCustomPagination";
import { FindManyOptions, In, Like, Repository } from "typeorm";
import { TrackService } from "../track/track.service";
import { GetArtistsArgs } from "./args/GetArtists.arg";
import { ArtistToTrack } from "./artist-to-track.entity";
import { Artist } from "./artist.entity";

@Injectable()
export class ArtistService {
    constructor(
        @InjectRepository(Artist)
        private artistsRepository: Repository<Artist>,
        @InjectRepository(ArtistToTrack)
        private artistToTrackRepository: Repository<ArtistToTrack>,
        private trackService: TrackService
    ) {}

    find(args: GetArtistsArgs): Promise<Pagination<Artist>> {
        const cond: FindManyOptions<Artist> = args.query
            ? {
                  where: {
                      name: Like(`%${args.query}%`),
                  },
              }
            : undefined;

        return paginate<Artist>(
            this.artistsRepository,
            {
                limit: args.limit,
                page: args.page,
            },
            cond
        ).then(convertToCustomPagination);
    }

    findOneById(id: string): Promise<Artist> {
        return this.artistsRepository.findOne(id);
    }

    async findArtistsInAlbum(albumId: string): Promise<Artist[]> {
        const tracks = await this.trackService.findByAlbumId(albumId);
        const trackIds = tracks.map(t => t.id);
        const artistToTracks = await this.artistToTrackRepository.find({
            where: {
                trackId: In(trackIds),
            },
        });

        const artistIds = artistToTracks.map(artistToTrack => artistToTrack.artistId);

        return this.artistsRepository.findByIds(artistIds);
    }

    async findArtistsInTrack(trackId: string): Promise<Artist[]> {
        const artistToTracks = await this.artistToTrackRepository.find({
            where: {
                trackId,
            },
        });

        const artistIds = artistToTracks.map(artistToTrack => artistToTrack.artistId);

        return this.artistsRepository.findByIds(artistIds);
    }
}
