import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class UpdatePlaylistArgs {
    @Field(type => String)
    id: string;

    @Field(type => String)
    name: string;
}
