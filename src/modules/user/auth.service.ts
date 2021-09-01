import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginSocialRequest } from './requests/login-fb.request';
import { SUPPORTED_SOCIAL_PROVIDERS } from './social-provider.entity';
import { User } from './user.entity';
import { UserService } from './user.service';
import { OAuth2Client } from 'google-auth-library';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) { }


  async loginBySocialProvider(params: LoginSocialRequest): Promise<string> {
    const socialInfo = await this.verifyIdToken(params);

    let existedUser = await this.usersService.findUserBySocialInfo(params.providerId, socialInfo.uid);

    if (!existedUser) {
      existedUser = await this.usersService.createUserWithSocialInfo(socialInfo.name, params.providerId, socialInfo.uid);
    }

    return this.createTokenForUser(existedUser).access_token;
  }

  private async verifyIdToken(params: LoginSocialRequest) {
    switch (params.providerId) {
      case SUPPORTED_SOCIAL_PROVIDERS.GOOGLE:
        const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);
        const result = await googleClient.verifyIdToken({
          idToken: params.idToken,
          audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = result.getPayload();

        return {
          name: payload.name,
          uid: payload.sub,
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

  createTokenForUser(user: User) {
    const payload = { name: user.name, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}