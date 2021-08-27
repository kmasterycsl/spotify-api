import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { GetTracksArgs } from './args/GetTracks.args';
import { ArtistToTrack } from './artist-to-track.entity';
import { Track } from './track.entity';

@Injectable()
export class TrackService {
    constructor(
        @InjectRepository(Track)
        private tracksRepository: Repository<Track>,
        @InjectRepository(ArtistToTrack)
        private artistToTrackRepository: Repository<ArtistToTrack>,
    ) { }

    async findByArtistId(artistId: string, args: GetTracksArgs): Promise<Pagination<Track>> {
        const artistToTracks = await paginate(this.artistToTrackRepository, args, { where: { artistId } });
        const trackIds = artistToTracks.items.map(att => att.trackId);
        const tracks = await this.tracksRepository.findByIds(trackIds);
        return new Pagination(tracks, artistToTracks.meta)
    }
}