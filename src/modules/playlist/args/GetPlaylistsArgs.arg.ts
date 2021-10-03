import { ArgsType, Field } from "@nestjs/graphql";
import { PaginationArgs } from "src/shared/args/PaginationArgs";

@ArgsType()
export class GetPlaylistsArgs extends PaginationArgs {
    @Field(type => String)
    query?: string;
}
