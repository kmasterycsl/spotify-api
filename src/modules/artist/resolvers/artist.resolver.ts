import { Args, Query, Resolver } from '@nestjs/graphql';
import { Artist } from 'src/graphql';
import { ArtistService } from '../services/artist/artist.service';


@Resolver('Artist')
export class ArtistResolver {
    constructor(
        private readonly artistsService: ArtistService,
    ) { }

    @Query('artists')
    async getArtists() {
        return [];
    }

    @Query('artist')
    async getArtistById(@Args('id') id: string): Promise<Artist> {
        return this.artistsService.findOne(id);
    }

}