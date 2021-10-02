import Faker from "faker";
import { Asset, AssetType, IImageMeta, ISoundMeta } from "src/modules/asset/asset.entity";
import { define } from "typeorm-seeding";
import { random } from "lodash";

const TOTAL_SONGS = 23;

define(
    Asset,
    (
        faker: typeof Faker,
        context: {
            type: AssetType;
            kind:
                | "artist-avatar"
                | "artist-cover"
                | "genre-cover"
                | "album-cover"
                | "playlist-cover"
                | "sound";
        }
    ) => {
        const asset = new Asset<IImageMeta | ISoundMeta>();
        asset.type = context.type;

        switch (context.kind) {
            case "artist-avatar":
                asset.meta = {
                    height: 128,
                    width: 128,
                    source: `https://picsum.photos/seed/${Math.random()}/${128}/${128}`,
                };
                break;
            case "artist-cover":
                asset.meta = {
                    height: 360,
                    width: 850,
                    source: `https://picsum.photos/seed/${Math.random()}/${850}/${360}`,
                };
                break;
            case "genre-cover":
                asset.meta = {
                    height: 360,
                    width: 850,
                    source: `https://picsum.photos/seed/${Math.random()}/${500}/${360}`,
                };
                break;
            case "playlist-cover":
                asset.meta = {
                    height: 360,
                    width: 360,
                    source: `https://picsum.photos/seed/${Math.random()}/${850}/${360}`,
                };
                break;
            case "album-cover":
                asset.meta = {
                    height: 360,
                    width: 360,
                    source: `https://picsum.photos/seed/${Math.random()}/${850}/${360}`,
                };
                break;
            case "sound":
                asset.meta = {
                    length: 240000,
                    source: `https://open-spotify-dev.s3.ap-southeast-1.amazonaws.com/tracks/${random(
                        1,
                        TOTAL_SONGS
                    )}.mp3`,
                };
                break;
            default:
                throw new Error("Kind is not supported");
        }

        return asset;
    }
);
