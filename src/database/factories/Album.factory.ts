import Faker from 'faker';
import * as _ from 'lodash';
import { Album, AlbumType } from 'src/modules/album/album.entity';
import { Asset, AssetType } from 'src/modules/asset/asset.entity';
import { define, factory } from 'typeorm-seeding';

define(Album, (faker: typeof Faker, context: { artistId: string }) => {
    const album = new Album();
    album.name = faker.lorem.words(_.random(2, 7));
    album.description = faker.lorem.words(_.random(0, 15));
    album.coverImage = factory(Asset)({ kind: 'album-cover', type: AssetType.IMAGE }) as any;
    album.artistId = context.artistId;
    album.type = _.random(0, 1) === 0 ? AlbumType.COMPILATION : AlbumType.SINGLE;

    return album;
})