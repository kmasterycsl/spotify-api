import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistResolver } from './artist.resolver';
import { AssetModule } from '../asset/asset.module';
import { Artist } from './artist.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Artist]),
        AssetModule,
    ],
    providers: [ArtistService, ArtistResolver],
    controllers: [ArtistController],
    exports: [ArtistService],
})
export class ArtistModule { }
