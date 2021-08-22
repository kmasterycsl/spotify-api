import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
    paginate,
    Pagination,
} from 'nestjs-typeorm-paginate';
import { GetArtistsArgs } from './args/GetArtists.arg';
import { Artist } from './artist.entity';
@Injectable()
export class ArtistService {
    constructor(
        @InjectRepository(Artist)
        private artistsRepository: Repository<Artist>,
    ) { }

    find(args: GetArtistsArgs): Promise<Pagination<Artist>> {
        return paginate<Artist>(this.artistsRepository, { limit: args.limit, page: args.page });
    }

    findOneById(id: string): Promise<Artist> {
        return this.artistsRepository.findOne(id);
    }
}
