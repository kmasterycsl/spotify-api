import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { TrackService } from "src/modules/track/track.service";
import { CurrentUser } from "src/shared/decorators/current-user.decorator";
import { Pagination } from "src/shared/Pagination";
import { GetTracksArgs } from "../track/args/GetTracks.args";
import { Track } from "../track/track.entity";
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

    @Query(() => Playlist, { name: "playlist", nullable: true })
    async getPlaylist(@Args("id") id: string): Promise<Playlist> {
        return this.playlistService.findOneById(id);
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

    @ResolveField()
    async tracks(
        @Parent() playlist: Playlist,
        @Args() args: GetTracksArgs
    ): Promise<Pagination<Track>> {
        return this.trackService.findByPlaylistId(playlist.id, args);
    }

    @ResolveField(() => Number)
    async tracksCount(@Parent() playlist: Playlist): Promise<number> {
        return this.playlistService.getTracksCount(playlist.id);
    }
}
