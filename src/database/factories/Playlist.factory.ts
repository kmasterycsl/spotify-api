import Faker from "faker";
import { Playlist } from "src/modules/playlist/playlist.entity";
import { Asset, AssetType } from "src/modules/asset/asset.entity";
import { define, factory } from "typeorm-seeding";

define(Playlist, (faker: typeof Faker) => {
    const name = faker.lorem.sentence(3);

    const playlist = new Playlist();
    playlist.name = name;
    playlist.userId = "1";
    playlist.coverImage = factory(Asset)({
        kind: "playlist-cover",
        type: AssetType.IMAGE,
    }) as any;

    return playlist;
});
