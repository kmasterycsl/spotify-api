import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TrackModule } from "src/modules/track/track.module";
import { AssetModule } from "../asset/asset.module";
import { GenreModule } from "../genre/genre.module";
import { LikeableModule } from "../likeable/likeable.module";
import { PlaylistToTrack } from "./playlist-to-track.entity";
import { Playlist } from "./playlist.entity";
import { PlaylistResolver } from "./playlist.resolver";
import { PlaylistService } from "./playlist.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Playlist, PlaylistToTrack]),
        AssetModule,
        forwardRef(() => TrackModule),
        forwardRef(() => LikeableModule),
        forwardRef(() => GenreModule),
    ],
    providers: [PlaylistService, PlaylistResolver],
    exports: [TypeOrmModule, PlaylistService],
})
export class PlaylistModule {}
