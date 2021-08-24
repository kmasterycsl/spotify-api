import Faker from 'faker'
import { Asset, AssetType, IImageMeta, ISoundMeta } from 'src/modules/asset/asset.entity'
import { define } from 'typeorm-seeding'

define(Asset, (faker: typeof Faker, context: { type: AssetType, kind: 'artist-avatar' | 'artist-cover' | 'sound' }) => {
    const asset = new Asset<IImageMeta | ISoundMeta>();
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
                source: `https://picsum.photos/${850}/${360}?random=${Math.random()}&grayscale&blur=2`,
            }
            break;
        case 'sound':
            asset.meta = {
                length: 240000,
                source: `https://cxiii.dcdaadaafd.xyz/?file=M3R4SUNiN3JsOHJ6WWQ2a3NQS1Y5ZGlxVlZIOCtyZ1FrTkFjeGdRUkFMOEg3YTRqMlBlbGFQMUFaWk1IeU1HUkJOQWZ2aEhLZU5lQ1BrU3NwcEVsQ1Z5VDlONDRxaXZkOHNVU1hNUjRUbGoxaTdYbGtEaDZqRGpsZjh6RlNQMEVTMjUwdGxSMjBTUFdudGZacVVhOTRWdXA0aCtsZFhZSHN5OE9jL2JmL05RRm5uM0RhdkhseDRJRXVSbWM3cFZhMzgrSnV6N2l5N2NCcThsN1lVdG1lcGRVMTZYd3ovblBta2dMZzVFWnlWbTJxTjIwQTVNOEJKcVpJQlpFT2hFVC9yYmhlVlVUMzNaWS9YU3UvNzBnK21rRWRQMGt2akR0cjZDOU5tZk9PTkgvVlpUWmZycmw4SkNnc2I5eXFSelNzTEdW`,
            }
            break;
        default:
            throw new Error('Kind is not supported');
    }

    return asset;
})