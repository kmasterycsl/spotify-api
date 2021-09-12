import { forwardRef, Module } from "@nestjs/common";
import { ArtistService } from "./artist.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArtistResolver } from "./artist.resolver";
import { AssetModule } from "../asset/asset.module";
import { Artist } from "./artist.entity";
import { TrackModule } from "src/modules/track/track.module";
import { ArtistToTrack } from "./artist-to-track.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Artist, ArtistToTrack]),
        AssetModule,
        forwardRef(() => TrackModule),
    ],
    providers: [ArtistService, ArtistResolver],
    exports: [TypeOrmModule, ArtistService],
})
export class ArtistModule {}
