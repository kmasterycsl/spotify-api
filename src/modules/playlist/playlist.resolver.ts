import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { TrackService } from "src/modules/track/track.service";
import { CurrentUser } from "src/shared/decorators/current-user.decorator";
import { GqlAuthGuard } from "../user/strategies/graphql.guard";
import { User } from "../user/user.entity";
import { AddTrackToPlaylist } from "./args/AddTrackToPlaylist.arg";
import { CreatePlaylistArgs } from "./args/CreatePlaylist.arg";
import { Playlist } from "./playlist.entity";
import { PlaylistService } from "./playlist.service";

@Resolver(() => Playlist)
export class PlaylistResolver {
    constructor(
        private readonly playlistService: PlaylistService,
        private readonly trackService: TrackService
    ) {}

    @Query(() => [Playlist])
    @UseGuards(GqlAuthGuard)
    async getOwnPlaylists(@CurrentUser() user: User) {
        return this.playlistService.findByUserId(user.id);
    }

    @Mutation(() => Playlist)
    @UseGuards(GqlAuthGuard)
    async createPlaylist(
        @Args() args: CreatePlaylistArgs,
        @CurrentUser() user: User
    ): Promise<Playlist> {
        return this.playlistService.createPlaylist(args, user);
    }

    @Mutation(() => Playlist)
    @UseGuards(GqlAuthGuard)
    async addTrackToPlaylist(
        @Args() args: AddTrackToPlaylist,
        @CurrentUser() user: User
    ): Promise<Playlist> {
        return this.playlistService.addTrackToPlaylist(args, user);
    }

    @ResolveField(() => Number)
    async tracksCount(@Parent() playlist: Playlist): Promise<number> {
        return this.playlistService.getTracksCount(playlist.id);
    }
}
