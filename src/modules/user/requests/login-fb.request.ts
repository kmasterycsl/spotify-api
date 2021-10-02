import { IsNotEmpty, IsString } from "class-validator";
import { IsEntityExist } from "src/shared/decorators/is-entity-exist.decorator";
import { SocialProvider } from "../social-provider.entity";

export class LoginSocialRequest {
    @IsNotEmpty()
    @IsString()
    idToken: string;

    @IsNotEmpty()
    @IsString()
    @IsEntityExist(SocialProvider)
    providerId: string;
}
