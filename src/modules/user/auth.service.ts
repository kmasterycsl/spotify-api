import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SUPPORTED_SOCIAL_PROVIDERS } from './social-provider.entity';
import { User, UserWithAccessToken } from './user.entity';
import { UserService } from './user.service';
import { OAuth2Client } from 'google-auth-library';
import { LoginByGoogleArgs } from './args/LoginByGoogle.arg';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) { }


  async loginBySocialProvider(params: LoginByGoogleArgs): Promise<UserWithAccessToken> {
    const socialInfo = await this.verifyIdToken(params);

    let existedUser = await this.usersService.findUserBySocialInfo(params.providerId, socialInfo.uid);

    if (!existedUser) {
      existedUser = await this.usersService.createUserWithSocialInfo(socialInfo.name, params.providerId, socialInfo.uid);
    }

    return {
      user: existedUser,
      accessToken: this.createTokenForUser(existedUser).access_token,
    };
  }

  private async verifyIdToken(params: LoginByGoogleArgs) {
    switch (params.providerId) {
      case SUPPORTED_SOCIAL_PROVIDERS.GOOGLE:
        const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);
        try {
          const result = await googleClient.verifyIdToken({
            idToken: params.idToken,
            audience: process.env.GOOGLE_CLIENT_ID
          });

          const payload = result.getPayload();

          return {
            name: payload.name,
            uid: payload.sub,
          }
        } catch (e) {
          console.error(e);
          throw new BadRequestException({
            statusCode: 400,
            message: [
              "idToken is not valid",
            ],
            error: "Bad Request"
          });
        }
      case SUPPORTED_SOCIAL_PROVIDERS.FACEBOOK:
        return {
          name: null,
          uid: null
        }
      default:
        throw new InternalServerErrorException('Missing provider handler');
    }
  }

  private createTokenForUser(user: User) {
    const payload = { name: user.name, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}