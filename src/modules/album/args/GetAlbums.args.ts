import { ArgsType, Field } from "@nestjs/graphql";
import { PaginationArgs } from "src/shared/args/PaginationArgs";

@ArgsType()
export class GetAlbumsArgs extends PaginationArgs {
    @Field(type => String, { nullable: true })
    query?: string;
}
