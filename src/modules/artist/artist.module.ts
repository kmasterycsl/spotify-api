import { Module } from '@nestjs/common';
import { ArtistService } from './services/artist/artist.service';
import { ArtistController } from './controllers/artist/artist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Artist])],
    providers: [ArtistService],
    controllers: [ArtistController]
})
export class ArtistModule { }
