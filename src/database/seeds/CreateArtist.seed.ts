import { Artist } from 'src/modules/artist/artist.entity';
import { Connection } from 'typeorm'
import { Factory, Seeder } from 'typeorm-seeding'

export default class CreateArtist implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        const artists = await factory(Artist)().createMany(10);
    }
}