import { Module } from "@nestjs/common";
import { Asset } from "./asset.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AssetService } from "./asset.service";

@Module({
    imports: [TypeOrmModule.forFeature([Asset])],
    providers: [AssetService],
    exports: [AssetService],
})
export class AssetModule {}
