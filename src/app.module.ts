import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ArtistModule } from "./modules/artist/artist.module";
import { AssetModule } from "./modules/asset/asset.module";
import { GraphQLModule } from "@nestjs/graphql";
import { TrackModule } from "./modules/track/track.module";
import { UserModule } from "./modules/user/user.module";
import { AlbumModule } from "./modules/album/album.module";
import { LikeableModule } from "./modules/likeable/likeable.module";
import { PlaylistModule } from "./modules/playlist/playlist.module";
import { GenreModule } from "./modules/genre/genre.module";

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot(),
        GraphQLModule.forRoot({
            installSubscriptionHandlers: true,
            autoSchemaFile: "schema.gql",
        }),
        ArtistModule,
        AssetModule,
        TrackModule,
        UserModule,
        AlbumModule,
        LikeableModule,
        PlaylistModule,
        GenreModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
