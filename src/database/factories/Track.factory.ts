import Faker from "faker";
import { Asset, AssetType } from "src/modules/asset/asset.entity";
import { Track } from "src/modules/track/track.entity";
import { define, factory } from "typeorm-seeding";

define(Track, (faker: typeof Faker, context: { albumId: string }) => {
    const name = faker.commerce.productName();

    const track = new Track();
    track.name = name;
    track.albumId = context.albumId;
    track.sound = factory(Asset)({ kind: "sound", type: AssetType.SOUND }) as any;

    return track;
});
