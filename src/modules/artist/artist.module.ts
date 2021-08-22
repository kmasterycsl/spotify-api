import { Module } from '@nestjs/common';
import { ArtistService } from './services/artist/artist.service';
import { ArtistController } from './controllers/artist/artist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from './entities/artist.entity';
import { ArtistResolver } from './resolvers/artist.resolver';

@Module({
    imports: [TypeOrmModule.forFeature([ArtistEntity])],
    providers: [ArtistService, ArtistResolver],
    controllers: [ArtistController]
})
export class ArtistModule { }
