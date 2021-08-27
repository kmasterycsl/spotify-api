import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistToTrack } from './artist-to-track.entity';
import { Track } from './track.entity';
import { TrackService } from './track.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Track, ArtistToTrack]),
    ],
    providers: [TrackService],
    exports: [TrackService]
})
export class TrackModule { }
