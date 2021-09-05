import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Track } from 'src/modules/track/track.entity';
import { TrackService } from 'src/modules/track/track.service';
import { Album } from '../album/album.entity';
import { AlbumService } from '../album/album.service';
import { Artist } from '../artist/artist.entity';
import { ArtistService } from '../artist/artist.service';


@Resolver(of => Track)
export class TrackResolver {
    constructor(
        private readonly trackService: TrackService,
        private readonly albumService: AlbumService,
        private readonly artistService: ArtistService,
    ) { }

    @Query(returns => Track, { name: 'track' })
    async getTrackById(@Args('id') id: string): Promise<Track> {
        return this.trackService.findOneById(id);
    }

    @ResolveField(returns => Album)
    async album(@Parent() track: Track): Promise<Album> {
        return this.albumService.findOneById(track.albumId);
    }
    
    @ResolveField(returns => [Artist])
    async artists(@Parent() track: Track): Promise<Artist[]> {
        return this.artistService.findArtistsInTrack(track.id);
    }
}
