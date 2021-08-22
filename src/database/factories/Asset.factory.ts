import Faker from 'faker'
import { Asset, AssetType, IImageMeta } from 'src/modules/asset/asset.entity'
import { define } from 'typeorm-seeding'

define(Asset, (faker: typeof Faker, context: { type: AssetType, kind: 'artist-avatar' | 'artist-cover' }) => {
    const asset = new Asset<IImageMeta>();
    asset.type = context.type;

    switch (context.kind) {
        case 'artist-avatar':
            asset.meta = {
                height: 128,
                width: 128,
                source: `https://picsum.photos/${128}/${128}?random=${Math.random()}&grayscale&blur=2`,
            }
            break;
        case 'artist-cover':
            asset.meta = {
                height: 360,
                width: 850,
                source: `https://picsum.photos/${360}/${850}?random=${Math.random()}&grayscale&blur=2`,
            }
            break;
        default:
            throw new Error('Kind is not supported');
    }

    return asset;
})