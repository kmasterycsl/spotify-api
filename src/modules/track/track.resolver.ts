import { UseGuards } from "@nestjs/common";
import { Args, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Track } from "src/modules/track/track.entity";
import { TrackService } from "src/modules/track/track.service";
import { CurrentUser } from "src/shared/decorators/current-user.decorator";
import { Album } from "../album/album.entity";
import { AlbumService } from "../album/album.service";
import { Artist } from "../artist/artist.entity";
import { ArtistService } from "../artist/artist.service";
import { LikeableType } from "../likeable/likeable.entity";
import { LikeableService } from "../likeable/likeable.service";
import { GqlAuthGuard } from "../user/strategies/graphql.guard";

@Resolver(() => Track)
export class TrackResolver {
    constructor(
        private readonly trackService: TrackService,
        private readonly albumService: AlbumService,
        private readonly artistService: ArtistService,
        private readonly likeableService: LikeableService
    ) {}

    @Query(() => Track, { name: "track" })
    async getTrackById(@Args("id") id: string): Promise<Track> {
        return this.trackService.findOneById(id);
    }

    @ResolveField(() => Album)
    async album(@Parent() track: Track): Promise<Album> {
        return this.albumService.findOneById(track.albumId);
    }

    @ResolveField(() => Boolean)
    async isLiked(@Parent() track: Track, @CurrentUser() user?): Promise<boolean> {
        return user
            ? !!(await this.likeableService.findOneLikable(LikeableType.TRACK, track.id, user.id))
            : false;
    }

    @ResolveField(() => [Artist])
    async artists(@Parent() track: Track): Promise<Artist[]> {
        return this.artistService.findArtistsInTrack(track.id);
    }
}
