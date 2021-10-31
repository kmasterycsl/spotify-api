import { User } from "src/modules/user/user.entity";
import { Factory, Seeder } from "typeorm-seeding";

export default class CreateAdminUser implements Seeder {
    public async run(factory: Factory): Promise<any> {
        await factory(User)({ name: "Open Spotify" }).create();
    }
}
