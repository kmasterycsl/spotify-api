import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { TrackService } from "src/modules/track/track.service";
import { CurrentUser } from "src/shared/decorators/current-user.decorator";
import { GqlAuthGuard } from "../user/strategies/graphql.guard";
import { User } from "../user/user.entity";
import { CreatePlaylistArgs } from "./args/CreatePlaylist.arg";
import { Playlist } from "./playlist.entity";
import { PlaylistService } from "./playlist.service";

@Resolver(() => Playlist)
export class PlaylistResolver {
    constructor(
        private readonly playlistService: PlaylistService,
        private readonly trackService: TrackService
    ) {}

    @Mutation(() => Playlist)
    @UseGuards(GqlAuthGuard)
    async createPlaylist(
        @Args() args: CreatePlaylistArgs,
        @CurrentUser() user: User
    ): Promise<Playlist> {
        return this.playlistService.createPlaylist(args, user);
    }
}
