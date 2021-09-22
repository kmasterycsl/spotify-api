import * as _ from "lodash";
import { GenreToPlaylist } from "src/modules/genre/genre-to-playlist.entity";
import { Genre } from "src/modules/genre/genre.entity";
import { Playlist } from "src/modules/playlist/playlist.entity";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";

export default class CreateGenre implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        const genres = await factory(Genre)().createMany(30);

        const genreToPlaylists$ = [];

        for (const genre of genres) {
            const playlistsNum = _.random(1, 20);
            const playlists = await connection
                .createQueryBuilder(Playlist, "playlist")
                .orderBy("RAND()")
                .limit(playlistsNum)
                .getMany();
            for (const playlist of playlists) {
                genreToPlaylists$.push(
                    factory(GenreToPlaylist)({
                        genreId: genre.id,
                        playlistId: playlist.id,
                    }).create()
                );
            }
        }

        await Promise.all(genreToPlaylists$);
    }
}
