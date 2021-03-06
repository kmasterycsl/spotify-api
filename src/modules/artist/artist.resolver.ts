import { Args, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { AssetService } from "src/modules/asset/asset.service";
import { Asset, IImageMeta } from "src/modules/asset/asset.entity";
import { GetArtistsArgs } from "./args/GetArtists.arg";
import { Artist, PaginatedArtist } from "./artist.entity";
import { ArtistService } from "./artist.service";
import { Track } from "src/modules/track/track.entity";
import { TrackService } from "src/modules/track/track.service";
import { GetTracksArgs } from "src/modules/track/args/GetTracks.args";
import { CurrentUser } from "src/shared/decorators/current-user.decorator";
import { LikeableService } from "../likeable/likeable.service";
import { LikeableType } from "../likeable/likeable.entity";
import { Pagination } from "src/shared/Pagination";

@Resolver(() => Artist)
export class ArtistResolver {
    constructor(
        private readonly artistsService: ArtistService,
        private readonly assetService: AssetService,
        private readonly trackService: TrackService,
        private readonly likeableService: LikeableService
    ) {}

    @Query(() => PaginatedArtist, { name: "artists" })
    async getArtists(@Args() args: GetArtistsArgs) {
        return this.artistsService.find(args);
    }

    @Query(() => Artist, { name: "artist" })
    async getArtistById(@Args("id") id: string): Promise<Artist> {
        return this.artistsService.findOneById(id);
    }

    @ResolveField()
    async tracks(
        @Parent() artist: Artist,
        @Args() args: GetTracksArgs
    ): Promise<Pagination<Track>> {
        return this.trackService.findByArtistId(artist.id, args);
    }

    @ResolveField()
    async coverImage(
        @Parent() artist: Artist & { coverImageId: string }
    ): Promise<Asset<IImageMeta>> {
        return this.assetService.findOneById(artist.coverImageId);
    }

    @ResolveField()
    async avatarImage(
        @Parent() artist: Artist & { avatarImageId: string }
    ): Promise<Asset<IImageMeta>> {
        return this.assetService.findOneById(artist.avatarImageId);
    }

    @ResolveField(() => Boolean)
    async isLiked(@Parent() artist: Artist, @CurrentUser() user?): Promise<boolean> {
        return user
            ? !!(await this.likeableService.findOneLikable(LikeableType.ARTIST, artist.id, user.id))
            : false;
    }
}
