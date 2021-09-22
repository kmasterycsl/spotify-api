import Faker from "faker";
import { User } from "src/modules/user/user.entity";
import { define } from "typeorm-seeding";

define(User, (faker: typeof Faker, context: { name?: string }) => {
    const name = context.name || faker.name.firstName();

    const user = new User();
    user.name = name;

    return user;
});
