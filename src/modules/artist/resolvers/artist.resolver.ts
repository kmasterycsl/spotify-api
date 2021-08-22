import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AssetService } from 'src/modules/asset/asset.service';
import { AssetEntity, IImageMeta } from 'src/modules/asset/entities/asset.entity';
import { GetArtistsArgs } from '../args/GetArtists.arg';
import { ArtistEntity } from '../entities/artist.entity';
import { Artist } from '../models/artist.model';
import { ArtistService } from '../services/artist/artist.service';


@Resolver(of => Artist)
export class ArtistResolver {
    constructor(
        private readonly artistsService: ArtistService,
        private readonly assetService: AssetService,
    ) { }

    @Query(returns => [Artist])
    async getArtists(@Args() args: GetArtistsArgs) {
        return [];
    }

    @Query(returns => Artist)
    async getArtistById(@Args('id') id: string): Promise<ArtistEntity> {
        return this.artistsService.findOne(id);
    }

    @ResolveField()
    async coverImage(@Parent() artist: Artist & { coverImageId: string }): Promise<AssetEntity<IImageMeta>> {
        return this.assetService.findOne(artist.coverImageId);
    }

    @ResolveField()
    async avatarImage(@Parent() artist: Artist & { avatarImageId: string }): Promise<AssetEntity<IImageMeta>> {
        return this.assetService.findOne(artist.avatarImageId);
    }
}
