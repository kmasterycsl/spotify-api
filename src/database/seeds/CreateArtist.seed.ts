import { ArtistEntity } from 'src/modules/artist/entities/artist.entity'
import { Connection } from 'typeorm'
import { Factory, Seeder } from 'typeorm-seeding'

export default class CreateArtist implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        const artists = await factory(ArtistEntity)().createMany(10);
    }
}