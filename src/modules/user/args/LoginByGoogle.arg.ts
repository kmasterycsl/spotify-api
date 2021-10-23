import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class LoginByGoogleArgs {
    @Field(type => String, { nullable: true })
    idToken: string;

    @Field(type => String, { nullable: true })
    accessToken: string;

    @Field(type => String)
    // @IsEntityExist(SocialProvider)
    providerId: string;
}
