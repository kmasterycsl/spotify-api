import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistResolver } from './artist.resolver';
import { AssetModule } from '../asset/asset.module';
import { Artist } from './artist.entity';
import { TrackModule } from 'src/modules/track/track.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Artist]),
        AssetModule,
        TrackModule,
    ],
    providers: [ArtistService, ArtistResolver],
    exports: [ArtistService],
})
export class ArtistModule { }
