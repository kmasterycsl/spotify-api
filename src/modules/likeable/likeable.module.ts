import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Likeable } from "./likeable.entity";
import { LikeableService } from "./likeable.service";

@Module({
    imports: [TypeOrmModule.forFeature([Likeable])],
    providers: [LikeableService],
    exports: [LikeableService],
})
export class LikeableModule {}
