import Faker from "faker";
import { PlaylistToTrack } from "src/modules/playlist/playlist-to-track.entity";
import { define } from "typeorm-seeding";

define(
    PlaylistToTrack,
    (faker: typeof Faker, context: { playlistId: string; trackId: string; order: number }) => {
        const att = new PlaylistToTrack();
        att.trackId = context.trackId;
        att.playlistId = context.playlistId;
        att.order = context.order;

        return att;
    }
);
