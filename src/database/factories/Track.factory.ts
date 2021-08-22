import Faker from 'faker'
import { Artist } from 'src/modules/artist/artist.entity';
import { Asset, AssetType } from 'src/modules/asset/asset.entity'
import { Track } from 'src/track/track.entity';
import { define, factory } from 'typeorm-seeding';

define(Track, (faker: typeof Faker, context: { artistIds: string[] }) => {
    const name = faker.commerce.productName();

    const track = new Track();
    track.name = name;
    track.sound = factory(Asset)({ kind: 'sound', type: AssetType.SOUND }) as any;;

    return track;
})