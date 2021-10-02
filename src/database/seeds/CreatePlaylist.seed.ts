import * as _ from "lodash";
import { PlaylistToTrack } from "src/modules/playlist/playlist-to-track.entity";
import { Playlist } from "src/modules/playlist/playlist.entity";
import { Track } from "src/modules/track/track.entity";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";

export default class CreatePlaylist implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        const playlists = await factory(Playlist)().createMany(100);

        const playlistToTracks$ = [];

        for (const playlist of playlists) {
            const tracksNum = _.random(1, 10);
            const tracks = await connection
                .createQueryBuilder(Track, "track")
                .orderBy("RAND()")
                .limit(tracksNum)
                .getMany();
            let order = 0;
            for (const track of tracks) {
                playlistToTracks$.push(
                    factory(PlaylistToTrack)({
                        playlistId: playlist.id,
                        trackId: track.id,
                        order: order++,
                    }).create()
                );
            }
        }

        await Promise.all(playlistToTracks$);
    }
}
