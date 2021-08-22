import Faker from 'faker'
import { ArtistEntity } from 'src/modules/artist/entities/artist.entity'
import { AssetEntity, AssetType } from 'src/modules/asset/entities/asset.entity'
import { define, factory } from 'typeorm-seeding'

define(ArtistEntity, (faker: typeof Faker) => {
    const name = faker.name.firstName() + ' ' + faker.name.lastName();
    const biography = faker.lorem.sentence();

    const artist = new ArtistEntity();
    artist.name = name;
    artist.biography = biography;
    artist.avatarImage = factory(AssetEntity)({ kind: 'artist-avatar', type: AssetType.IMAGE }) as any;
    artist.coverImage = factory(AssetEntity)({ kind: 'artist-cover', type: AssetType.IMAGE }) as any;

    return artist;
})