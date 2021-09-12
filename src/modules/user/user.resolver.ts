import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CurrentUser } from "src/shared/decorators/current-user.decorator";
import { LoginByGoogleArgs } from "./args/LoginByGoogle.arg";
import { AuthService } from "./auth.service";
import { GqlAuthGuard } from "./strategies/graphql.guard";
import { User, UserWithAccessToken } from "./user.entity";
import { UserService } from "./user.service";

@Resolver(of => User)
export class UserResolver {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService
    ) {}

    @Query(returns => User)
    @UseGuards(GqlAuthGuard)
    whoAmI(@CurrentUser() user: User) {
        return this.userService.findOneById(user.id);
    }

    @Mutation(returns => UserWithAccessToken)
    async loginBySocialProvider(@Args() args: LoginByGoogleArgs): Promise<UserWithAccessToken> {
        return this.authService.loginBySocialProvider(args);
    }

    @Query(returns => User, { name: "user" })
    async getUserById(@Args("id") id: string): Promise<User> {
        return this.userService.findOneById(id);
    }
}
