import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asset, IImageMeta } from './asset.entity';

@Injectable()
export class AssetService {
    constructor(
        @InjectRepository(Asset)
        private assetsRepository: Repository<Asset<any>>,
    ) { }

    findOneById<T extends IImageMeta>(id: string): Promise<Asset<T>> {
        return this.assetsRepository.findOne(id);
    }
}
