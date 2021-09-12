import { Injectable } from "@nestjs/common";
import { GqlAuthGuard } from "./graphql.guard";

@Injectable()
export class OptionalGqlAuthGuard extends GqlAuthGuard {
    handleRequest(err, user, info, context) {
        return user;
    }
}
