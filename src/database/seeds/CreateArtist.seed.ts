import { Artist } from 'src/modules/artist/artist.entity';
import { Track } from 'src/modules/track/track.entity';
import { Connection } from 'typeorm'
import { Factory, Seeder } from 'typeorm-seeding'
import * as _ from 'lodash';
import { ArtistToTrack } from 'src/modules/track/artist-to-track.entity';

export default class CreateArtist implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        const artists = await factory(Artist)().createMany(10);
        const tracks = await factory(Track)().createMany(500);
        const artistToTracks$ = [];
        for (const track of tracks) {
            const numArtists = _.random(1, 3);
            const pickedArtists = [];
            let lastOrder = 0;

            for (let i = 1; i <= numArtists; i++) {
                const randomArtist = artists[_.random(0, artists.length - 1)];
                if (!pickedArtists.includes(randomArtist)) {
                    artistToTracks$.push(factory(ArtistToTrack)({
                        artistId: randomArtist.id,
                        trackId: track.id,
                        order: lastOrder++,
                    }).create());
                }
            }
        }
        await Promise.all(artistToTracks$);
    }
}