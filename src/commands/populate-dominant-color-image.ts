import { NestFactory } from "@nestjs/core";
import { AppModule } from "src/app.module";
import { AssetModule } from "src/modules/asset/asset.module";
import { AssetService } from "src/modules/asset/asset.service";

(async () => {
    const context = await NestFactory.createApplicationContext(AppModule);
    const module = await context.select<AssetModule>(AssetModule);
    const assetService = module.get<AssetService>(AssetService);

    await assetService.populateDominantColorForAllImages();

    console.log("Done");
})();
