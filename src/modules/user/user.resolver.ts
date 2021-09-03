import { Args, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver(of => User)
export class UserResolver {
    constructor(
        private readonly userService: UserService,
    ) { }


    @Query(returns => User, { name: 'user' })
    async getUserById(@Args('id') id: string): Promise<User> {
        return this.userService.findOneById(id);
    }

}
