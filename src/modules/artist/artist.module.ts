import { forwardRef, Module } from "@nestjs/common";
import { ArtistService } from "./artist.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArtistResolver } from "./artist.resolver";
import { AssetModule } from "../asset/asset.module";
import { Artist } from "./artist.entity";
import { TrackModule } from "src/modules/track/track.module";
import { ArtistToTrack } from "./artist-to-track.entity";
import { LikeableModule } from "../likeable/likeable.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Artist, ArtistToTrack]),
        AssetModule,
        forwardRef(() => TrackModule),
        forwardRef(() => LikeableModule),
    ],
    providers: [ArtistService, ArtistResolver],
    exports: [TypeOrmModule, ArtistService],
})
export class ArtistModule {}
