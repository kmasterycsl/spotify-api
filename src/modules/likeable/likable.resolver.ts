import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { CurrentUser } from "src/shared/decorators/current-user.decorator";
import { GqlAuthGuard } from "../user/strategies/graphql.guard";
import { User } from "../user/user.entity";
import { LikeArgs } from "./args/Like.arg";
import { Likeable } from "./likeable.entity";
import { LikeableService } from "./likeable.service";

@Resolver(() => Likeable)
export class LikeableResolver {
    constructor(private readonly likeableService: LikeableService) {}

    @Mutation(() => Boolean)
    @UseGuards(GqlAuthGuard)
    async like(@Args() args: LikeArgs, @CurrentUser() user: User): Promise<boolean> {
        return this.likeableService.like(args, user);
    }
}
