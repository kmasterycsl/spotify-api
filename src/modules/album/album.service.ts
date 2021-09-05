import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './album.entity';
@Injectable()
export class AlbumService {
    constructor(
        @InjectRepository(Album)
        private albumsRepository: Repository<Album>,
    ) { }

    findOneById(id: string): Promise<Album> {
        return this.albumsRepository.findOne(id);
    }
}
