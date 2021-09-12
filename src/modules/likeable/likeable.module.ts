import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TrackModule } from "../track/track.module";
import { LikeableResolver } from "./likable.resolver";
import { Likeable } from "./likeable.entity";
import { LikeableService } from "./likeable.service";

@Module({
    imports: [TypeOrmModule.forFeature([Likeable]), forwardRef(() => TrackModule)],
    providers: [LikeableService, LikeableResolver],
    exports: [LikeableService],
})
export class LikeableModule {}
