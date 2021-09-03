import { Body } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LoginByGoogleArgs } from './args/LoginByGoogle.arg';
import { AuthService } from './auth.service';
import { LoginSocialRequest } from './requests/login-fb.request';
import { User, UserWithAccessToken } from './user.entity';
import { UserService } from './user.service';

@Resolver(of => User)
export class UserResolver {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ) { }


    @Mutation(returns => UserWithAccessToken)
    async loginBySocialProvider(@Args() args: LoginByGoogleArgs): Promise<UserWithAccessToken> {
        return this.authService.loginBySocialProvider(args);
    }

    @Query(returns => User, { name: 'user' })
    async getUserById(@Args('id') id: string): Promise<User> {
        return this.userService.findOneById(id);
    }

}
