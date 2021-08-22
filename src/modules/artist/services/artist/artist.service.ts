import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArtistEntity } from '../../entities/artist.entity';

@Injectable()
export class ArtistService {
    constructor(
        @InjectRepository(ArtistEntity)
        private artistsRepository: Repository<ArtistEntity>,
    ) { }

    findOne(id: string): Promise<ArtistEntity> {
        return this.artistsRepository.findOne(id).then(res => {
            console.log(res);
            return res;
        });
    }
}
