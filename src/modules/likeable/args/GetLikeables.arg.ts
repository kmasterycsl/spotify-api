import { ArgsType, Field } from "@nestjs/graphql";
import { PaginationArgs } from "src/shared/args/PaginationArgs";
import { LikeableType } from "../likeable.entity";

@ArgsType()
export class GetLikeablesArg extends PaginationArgs {
    @Field(type => LikeableType, { nullable: true })
    likeableType: LikeableType;
}
