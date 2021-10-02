import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class DeletePlaylistArgs {
    @Field(type => String)
    id: string;
}
