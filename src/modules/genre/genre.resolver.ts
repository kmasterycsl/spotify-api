import { Args, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Asset, IImageMeta } from "src/modules/asset/asset.entity";
import { AssetService } from "src/modules/asset/asset.service";
import { Pagination } from "src/shared/Pagination";
import { Playlist } from "../playlist/playlist.entity";
import { PlaylistService } from "../playlist/playlist.service";
import { GetGenresArgs } from "./args/GetGenres.arg";
import { GetPlaylistsInGenreArgs } from "./args/GetPlaylists.args";
import { Genre, PaginatedGenre } from "./genre.entity";
import { GenreService } from "./genre.service";

@Resolver(() => Genre)
export class GenreResolver {
    constructor(
        private readonly genresService: GenreService,
        private readonly assetService: AssetService,
        private readonly playlistService: PlaylistService
    ) {}

    @Query(() => PaginatedGenre, { name: "genres" })
    async getGenres(@Args() args: GetGenresArgs) {
        return this.genresService.find(args);
    }

    @Query(() => Genre, { name: "genre" })
    async getGenreById(@Args("id") id: string): Promise<Genre> {
        return this.genresService.findOneById(id);
    }

    @ResolveField()
    async playlists(
        @Parent() genre: Genre,
        @Args() args: GetPlaylistsInGenreArgs
    ): Promise<Pagination<Playlist>> {
        return this.playlistService.findByGenreId(genre.id, args);
    }

    @ResolveField()
    async coverImage(
        @Parent() genre: Genre & { coverImageId: string }
    ): Promise<Asset<IImageMeta>> {
        return this.assetService.findOneById(genre.coverImageId);
    }
}
