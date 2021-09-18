import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { PaginationArgs } from "src/shared/args/PaginationArgs";
import { CurrentUser } from "src/shared/decorators/current-user.decorator";
import { Album } from "../album/album.entity";
import { AlbumService } from "../album/album.service";
import { Artist } from "../artist/artist.entity";
import { ArtistService } from "../artist/artist.service";
import { Playlist } from "../playlist/playlist.entity";
import { PlaylistService } from "../playlist/playlist.service";
import { Track } from "../track/track.entity";
import { TrackService } from "../track/track.service";
import { GqlAuthGuard } from "../user/strategies/graphql.guard";
import { User } from "../user/user.entity";
import { LikeArgs } from "./args/Like.arg";
import { Likeable, LikeableType, PaginatedLikeable } from "./likeable.entity";
import { LikeableService } from "./likeable.service";

@Resolver(() => Likeable)
export class LikeableResolver {
    constructor(
        private readonly likeableService: LikeableService,
        private readonly trackService: TrackService,
        private readonly albumService: AlbumService,
        private readonly artistService: ArtistService,
        private readonly playlistService: PlaylistService
    ) {}

    @Query(() => PaginatedLikeable, { name: "likeables" })
    @UseGuards(GqlAuthGuard)
    async getLikeables(@Args() args: PaginationArgs, @CurrentUser() user: User) {
        return this.likeableService.findByUserId(user.id, args);
    }

    @ResolveField(() => Album)
    async album(@Parent() likeable: Likeable): Promise<Album | null> {
        return likeable.likeableType === LikeableType.ALBUM
            ? this.albumService.findOneById(likeable.likeableId)
            : null;
    }

    @ResolveField(() => Track)
    async track(@Parent() likeable: Likeable): Promise<Track | null> {
        return likeable.likeableType === LikeableType.TRACK
            ? this.trackService.findOneById(likeable.likeableId)
            : null;
    }

    @ResolveField(() => Artist)
    async artist(@Parent() likeable: Likeable): Promise<Artist | null> {
        return likeable.likeableType === LikeableType.ARTIST
            ? this.artistService.findOneById(likeable.likeableId)
            : null;
    }

    @ResolveField(() => Playlist)
    async playlist(@Parent() likeable: Likeable): Promise<Playlist | null> {
        return likeable.likeableType === LikeableType.PLAYLIST
            ? this.playlistService.findOneById(likeable.likeableId)
            : null;
    }

    @Mutation(() => Boolean)
    @UseGuards(GqlAuthGuard)
    async like(@Args() args: LikeArgs, @CurrentUser() user: User): Promise<boolean> {
        return this.likeableService.like(args, user);
    }
}
