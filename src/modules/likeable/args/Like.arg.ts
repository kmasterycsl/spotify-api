import { ArgsType, Field } from "@nestjs/graphql";
import { LikeableType } from "../likeable.entity";

@ArgsType()
export class LikeArgs {
    @Field(type => LikeableType)
    likeableType: LikeableType;

    @Field(type => String)
    likeableId: string;
}
