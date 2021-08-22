import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AssetService } from 'src/modules/asset/asset.service';
import { Asset, IImageMeta } from 'src/modules/asset/asset.entity';
import { GetArtistsArgs } from './args/GetArtists.arg';
import { Artist, PaginatedArtist } from './artist.entity';
import { ArtistService } from './artist.service';

@Resolver(of => Artist)
export class ArtistResolver {
    constructor(
        private readonly artistsService: ArtistService,
        private readonly assetService: AssetService,
    ) { }

    @Query(returns => PaginatedArtist)
    async getArtists(@Args() args: GetArtistsArgs) {
        return this.artistsService.find(args);
    }

    @Query(returns => Artist)
    async getArtistById(@Args('id') id: string): Promise<Artist> {
        return this.artistsService.findOneById(id);
    }

    @ResolveField()
    async coverImage(@Parent() artist: Artist & { coverImageId: string }): Promise<Asset<IImageMeta>> {
        return this.assetService.findOneById(artist.coverImageId);
    }

    @ResolveField()
    async avatarImage(@Parent() artist: Artist & { avatarImageId: string }): Promise<Asset<IImageMeta>> {
        return this.assetService.findOneById(artist.avatarImageId);
    }
}
