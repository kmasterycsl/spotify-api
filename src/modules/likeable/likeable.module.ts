import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AlbumModule } from "../album/album.module";
import { ArtistModule } from "../artist/artist.module";
import { PlaylistModule } from "../playlist/playlist.module";
import { TrackModule } from "../track/track.module";
import { LikeableResolver } from "./likable.resolver";
import { Likeable } from "./likeable.entity";
import { LikeableService } from "./likeable.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Likeable]),
        forwardRef(() => TrackModule),
        forwardRef(() => AlbumModule),
        forwardRef(() => ArtistModule),
        forwardRef(() => PlaylistModule),
    ],
    providers: [LikeableService, LikeableResolver],
    exports: [TypeOrmModule, LikeableService],
})
export class LikeableModule {}
