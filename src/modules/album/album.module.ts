import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetModule } from '../asset/asset.module';
import { TrackModule } from 'src/modules/track/track.module';
import { Album } from './album.entity';
import { AlbumResolver } from './album.resolver';

@Module({
    imports: [
        TypeOrmModule.forFeature([Album]),
        AssetModule,
        TrackModule,
    ],
    providers: [AlbumService, AlbumResolver],
    exports: [AlbumService],
})
export class AlbumModule { }
