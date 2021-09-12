import Faker from "faker";
import { ArtistToTrack } from "src/modules/artist/artist-to-track.entity";
import { define } from "typeorm-seeding";

define(
    ArtistToTrack,
    (faker: typeof Faker, context: { artistId: string; trackId: string; order: number }) => {
        const att = new ArtistToTrack();
        att.trackId = context.trackId;
        att.artistId = context.artistId;
        att.order = context.order;

        return att;
    }
);
