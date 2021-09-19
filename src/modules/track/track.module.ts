import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AlbumModule } from "../album/album.module";
import { ArtistModule } from "../artist/artist.module";
import { LikeableModule } from "../likeable/likeable.module";
import { Track } from "./track.entity";
import { TrackResolver } from "./track.resolver";
import { TrackService } from "./track.service";

@Module({
    imports: [
        forwardRef(() => ArtistModule),
        forwardRef(() => AlbumModule),
        forwardRef(() => LikeableModule),
        TypeOrmModule.forFeature([Track]),
    ],
    providers: [TrackService, TrackResolver],
    exports: [TrackService, TypeOrmModule],
})
export class TrackModule {}
