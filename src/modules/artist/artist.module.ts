import { Module } from '@nestjs/common';
import { ArtistService } from './services/artist/artist.service';
import { ArtistController } from './controllers/artist/artist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from './entities/artist.entity';
import { ArtistResolver } from './resolvers/artist.resolver';
import { AssetModule } from '../asset/asset.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([ArtistEntity]),
        AssetModule,
    ],
    providers: [ArtistService, ArtistResolver],
    controllers: [ArtistController],
    exports: [ArtistService],
})
export class ArtistModule { }
