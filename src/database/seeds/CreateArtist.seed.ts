import { Artist } from 'src/modules/artist/artist.entity';
import { Track } from 'src/modules/track/track.entity';
import { Connection } from 'typeorm'
import { Factory, Seeder } from 'typeorm-seeding'
import * as _ from 'lodash';
import { ArtistToTrack } from 'src/modules/artist/artist-to-track.entity';
import { Album, AlbumType } from 'src/modules/album/album.entity';

export default class CreateArtist implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        const artists = await factory(Artist)().createMany(10);

        const artistToTracks$ = [];

        for (const artist of artists) {
            const albums = await factory(Album)({ artistId: artist.id }).createMany(_.random(1, 5));
            for (const album of albums) {
                const numTracks = album.type === AlbumType.SINGLE ? 1 : _.random(2, 15);
                const tracks = await factory(Track)({ albumId: album.id }).createMany(numTracks);
                for (const track of tracks) {
                    const numArtists = _.random(0, 3);
                    const pickedArtists = [artist];
                    let lastOrder = 0;

                    for (let i = 1; i <= numArtists; i++) {
                        const randomArtist = artists[_.random(0, artists.length - 1)];
                        if (!pickedArtists.includes(randomArtist)) {
                            pickedArtists.push(randomArtist);
                        }
                    }

                    for (const pickedArtist of pickedArtists) {
                        artistToTracks$.push(factory(ArtistToTrack)({
                            artistId: pickedArtist.id,
                            trackId: track.id,
                            order: lastOrder++,
                        }).create());
                    }
                }
            }
        }


        await Promise.all(artistToTracks$);
    }
}