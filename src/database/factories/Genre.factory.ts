import Faker from "faker";
import { Asset, AssetType } from "src/modules/asset/asset.entity";
import { Genre } from "src/modules/genre/genre.entity";
import { define, factory } from "typeorm-seeding";

define(Genre, (faker: typeof Faker) => {
    const name = "Genre " + faker.company.companyName();

    const genre = new Genre();
    genre.name = name;
    genre.coverImage = factory(Asset)({
        kind: "genre-cover",
        type: AssetType.IMAGE,
    }) as any;

    return genre;
});
