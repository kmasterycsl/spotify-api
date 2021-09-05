import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asset, AssetType, IImageMeta } from './asset.entity';
import * as followRedirects from 'follow-redirects';
import * as fs from 'fs';
import * as colorthief from 'colorthief';
@Injectable()
export class AssetService {
    constructor(
        @InjectRepository(Asset)
        private assetsRepository: Repository<Asset<any>>,
    ) { }

    findOneById<T extends IImageMeta>(id: string): Promise<Asset<T>> {
        return this.assetsRepository.findOne(id);
    }

    async populateDominantColorForAllImages() {
        const images: Asset<IImageMeta>[] = await this.assetsRepository.find({ type: AssetType.IMAGE });
        const ps1 = [];
        console.log('Start download images...');
        for (const image of images) {
            const p = new Promise((resolve, reject) => {
                const filePath = `/tmp/nest-tmp-${image.id}.jpg`;
                const file = fs.createWriteStream(filePath);
                const request = followRedirects.https.get(image.meta.source, function (response) {
                    if (response.statusCode !== 200) {
                        reject(new Error(`Failed to get ${image.meta.source}`));
                        return;
                    }
                    response.pipe(file);
                });
                request.on('error', reject);
                file.on('finish', () => {
                    resolve({
                        image,
                        filePath
                    });
                });
                file.on('error', reject);
            });
            ps1.push(p);
        }

        const localImages = await Promise.all(ps1);

        const ps2 = [];

        console.log('Start get color from images...');

        for (const { image, filePath } of localImages) {
            const color = await colorthief.getColor(filePath);

            ps2.push(this.assetsRepository.update(image.id, {
                meta: {
                    ...image.meta,
                    dominantColor: rgbToHex(color)
                }
            }))
        }

        await Promise.all(ps2);
    }
}


const rgbToHex = ([r, g, b]) => '#' + [r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
}).join('')