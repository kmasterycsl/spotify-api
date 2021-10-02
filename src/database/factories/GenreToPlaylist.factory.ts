import Faker from "faker";
import { GenreToPlaylist } from "src/modules/genre/genre-to-playlist.entity";
import { define } from "typeorm-seeding";

define(
    GenreToPlaylist,
    (faker: typeof Faker, context: { genreId: string; playlistId: string; order: number }) => {
        const att = new GenreToPlaylist();
        att.playlistId = context.playlistId;
        att.genreId = context.genreId;

        return att;
    }
);
