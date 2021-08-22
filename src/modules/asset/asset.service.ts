import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssetEntity, IImageMeta } from './entities/asset.entity';

@Injectable()
export class AssetService {
    constructor(
        @InjectRepository(AssetEntity)
        private assetsRepository: Repository<AssetEntity<any>>,
    ) { }

    findOne<T extends IImageMeta>(id: string): Promise<AssetEntity<T>> {
        return this.assetsRepository.findOne(id);
    }
}
