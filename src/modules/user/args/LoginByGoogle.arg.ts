import { ArgsType, Field, Int } from "@nestjs/graphql";
import { IsEntityExist } from "src/shared/decorators/is-entity-exist.decorator";
import { SocialProvider } from "../social-provider.entity";

@ArgsType()
export class LoginByGoogleArgs {
    @Field(type => String)
    idToken: string;

    @Field(type => String)
    // @IsEntityExist(SocialProvider)
    providerId: string;
}
