import { Module } from '@nestjs/common';
import { AssetEntity } from './entities/asset.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetService } from './asset.service';

@Module({
    imports: [TypeOrmModule.forFeature([AssetEntity])],
    providers: [AssetService],
    exports: [AssetService],
})
export class AssetModule {


}
