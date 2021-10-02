import Faker from "faker";
import { Artist } from "src/modules/artist/artist.entity";
import { Asset, AssetType } from "src/modules/asset/asset.entity";
import { define, factory } from "typeorm-seeding";

define(Artist, (faker: typeof Faker) => {
    const name = faker.name.firstName() + " " + faker.name.lastName();
    const biography = faker.lorem.sentence();

    const artist = new Artist();
    artist.name = name;
    artist.biography = biography;
    artist.avatarImage = factory(Asset)({
        kind: "artist-avatar",
        type: AssetType.IMAGE,
    }) as any;
    artist.coverImage = factory(Asset)({
        kind: "artist-cover",
        type: AssetType.IMAGE,
    }) as any;

    return artist;
});
