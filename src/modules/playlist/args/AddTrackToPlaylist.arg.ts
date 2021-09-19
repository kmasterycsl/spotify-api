import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class AddTrackToPlaylist {
    @Field(type => String)
    playlistId: string;

    @Field(type => String)
    trackId: string;
}
