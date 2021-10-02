import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TrackModule } from "src/modules/track/track.module";
import { AssetModule } from "../asset/asset.module";
import { LikeableModule } from "../likeable/likeable.module";
import { PlaylistModule } from "../playlist/playlist.module";
import { GenreToPlaylist } from "./genre-to-playlist.entity";
import { Genre } from "./genre.entity";
import { GenreResolver } from "./genre.resolver";
import { GenreService } from "./genre.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Genre, GenreToPlaylist]),
        AssetModule,
        forwardRef(() => TrackModule),
        forwardRef(() => LikeableModule),
        forwardRef(() => PlaylistModule),
    ],
    providers: [GenreService, GenreResolver],
    exports: [TypeOrmModule, GenreService],
})
export class GenreModule {}
