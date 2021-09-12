import { forwardRef, Module } from "@nestjs/common";
import { AlbumService } from "./album.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AssetModule } from "../asset/asset.module";
import { TrackModule } from "src/modules/track/track.module";
import { Album } from "./album.entity";
import { AlbumResolver } from "./album.resolver";
import { ArtistModule } from "../artist/artist.module";
import { LikeableModule } from "../likeable/likeable.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Album]),
        AssetModule,
        forwardRef(() => TrackModule),
        forwardRef(() => ArtistModule),
        forwardRef(() => LikeableModule),
    ],
    providers: [AlbumService, AlbumResolver],
    exports: [AlbumService],
})
export class AlbumModule {}
