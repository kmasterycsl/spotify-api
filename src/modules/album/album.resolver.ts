import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Asset, IImageMeta } from 'src/modules/asset/asset.entity';
import { AssetService } from 'src/modules/asset/asset.service';
import { Track } from 'src/modules/track/track.entity';
import { TrackService } from 'src/modules/track/track.service';
import { Album } from './album.entity';
import { AlbumService } from './album.service';

@Resolver(of => Album)
export class AlbumResolver {
    constructor(
        private readonly albumsService: AlbumService,
        private readonly assetService: AssetService,
        private readonly trackService: TrackService,
    ) { }

    @Query(returns => Album, { name: 'album' })
    async getAlbumById(@Args('id') id: string): Promise<Album> {
        return this.albumsService.findOneById(id);
    }

    @ResolveField()
    async tracks(@Parent() album: Album): Promise<Track[]> {
        return this.trackService.findByAlbumId(album.id);
    }

    @ResolveField()
    async coverImage(@Parent() album: Album & { coverImageId: string }): Promise<Asset<IImageMeta>> {
        return this.assetService.findOneById(album.coverImageId);
    }
}
