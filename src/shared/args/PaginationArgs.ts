import { ArgsType, Int, Field } from "@nestjs/graphql";

@ArgsType()
export class PaginationArgs {
    @Field(type => Int)
    page = 0;

    @Field(type => Int)
    limit = 10;
}
