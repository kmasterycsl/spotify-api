import { ArgsType, Field } from "@nestjs/graphql";
import { PaginationArgs } from "src/common/PaginationArgs";

@ArgsType()
export class GetArtistsArgs extends PaginationArgs {

}