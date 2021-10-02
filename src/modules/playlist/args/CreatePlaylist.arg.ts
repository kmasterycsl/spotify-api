import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class CreatePlaylistArgs {
    @Field(type => String)
    name: string;
}
