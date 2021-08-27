import Faker from 'faker'
import { Artist } from 'src/modules/artist/artist.entity';
import { Asset, AssetType } from 'src/modules/asset/asset.entity'
import { ArtistToTrack } from 'src/modules/track/artist-to-track.entity';
import { Track } from 'src/modules/track/track.entity';
import { define, factory } from 'typeorm-seeding'

define(ArtistToTrack, (faker: typeof Faker, context: { artistId: string, trackId: string, order: number }) => {
    const att = new ArtistToTrack();
    att.trackId = context.trackId;
    att.artistId = context.artistId;
    att.order = context.order;

    return att;
})