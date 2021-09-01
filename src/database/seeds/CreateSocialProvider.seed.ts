import { SocialProvider } from 'src/modules/user/social-provider.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export default class CreateSocialProvider implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        const repository = connection.getRepository(SocialProvider);
        await repository.save({ id: 'GOOGLE', name: 'GOOGLE' });
        await repository.save({ id: 'FACEBOOK', name: 'FACEBOOK' });
    }
}