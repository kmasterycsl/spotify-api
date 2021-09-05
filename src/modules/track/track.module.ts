import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistModule } from '../artist/artist.module';
import { Track } from './track.entity';
import { TrackService } from './track.service';

@Module({
    imports: [
        forwardRef(() => ArtistModule),
        TypeOrmModule.forFeature([Track]),
    ],
    providers: [TrackService],
    exports: [TrackService]
})
export class TrackModule { }
