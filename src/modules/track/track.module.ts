import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumModule } from '../album/album.module';
import { ArtistModule } from '../artist/artist.module';
import { Track } from './track.entity';
import { TrackResolver } from './track.resolver';
import { TrackService } from './track.service';

@Module({
    imports: [
        forwardRef(() => ArtistModule),
        forwardRef(() => AlbumModule),
        TypeOrmModule.forFeature([Track]),
    ],
    providers: [TrackService, TrackResolver],
    exports: [TrackService]
})
export class TrackModule { }
