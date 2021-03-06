import { Args, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Asset, IImageMeta } from "src/modules/asset/asset.entity";
import { AssetService } from "src/modules/asset/asset.service";
import { Track } from "src/modules/track/track.entity";
import { TrackService } from "src/modules/track/track.service";
import { CurrentUser } from "src/shared/decorators/current-user.decorator";
import { Artist } from "../artist/artist.entity";
import { ArtistService } from "../artist/artist.service";
import { LikeableType } from "../likeable/likeable.entity";
import { LikeableService } from "../likeable/likeable.service";
import { Album, PaginatedAlbum } from "./album.entity";
import { AlbumService } from "./album.service";
import { GetAlbumsArgs } from "./args/GetAlbums.args";

@Resolver(() => Album)
export class AlbumResolver {
    constructor(
        private readonly albumsService: AlbumService,
        private readonly assetService: AssetService,
        private readonly trackService: TrackService,
        private readonly artistService: ArtistService,
        private readonly likeableService: LikeableService
    ) {}

    @Query(() => PaginatedAlbum, { name: "albums" })
    async getPlaylists(@Args() args: GetAlbumsArgs) {
        return this.albumsService.find(args);
    }

    @Query(() => Album, { name: "album" })
    async getAlbumById(@Args("id") id: string): Promise<Album> {
        return this.albumsService.findOneById(id);
    }

    @ResolveField(() => [Track])
    async tracks(@Parent() album: Album): Promise<Track[]> {
        return this.trackService.findByAlbumId(album.id);
    }

    @ResolveField(() => [Artist])
    async allArtists(@Parent() album: Album): Promise<Artist[]> {
        return this.artistService.findArtistsInAlbum(album.id);
    }

    @ResolveField(() => Boolean)
    async isLiked(@Parent() album: Album, @CurrentUser() user?): Promise<boolean> {
        return user
            ? !!(await this.likeableService.findOneLikable(LikeableType.ALBUM, album.id, user.id))
            : false;
    }

    @ResolveField()
    async coverImage(
        @Parent() album: Album & { coverImageId: string }
    ): Promise<Asset<IImageMeta>> {
        return this.assetService.findOneById(album.coverImageId);
    }
}
