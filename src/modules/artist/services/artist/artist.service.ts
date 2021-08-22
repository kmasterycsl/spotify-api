import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArtistEntity } from '../../entities/artist.entity';
import {
    paginate,
    Pagination,
} from 'nestjs-typeorm-paginate';
import { GetArtistsArgs } from '../../args/GetArtists.arg';
@Injectable()
export class ArtistService {
    constructor(
        @InjectRepository(ArtistEntity)
        private artistsRepository: Repository<ArtistEntity>,
    ) { }

    find(args: GetArtistsArgs): Promise<Pagination<ArtistEntity>> {
        return paginate<ArtistEntity>(this.artistsRepository, { limit: args.limit, page: args.page });
    }

    findOne(id: string): Promise<ArtistEntity> {
        return this.artistsRepository.findOne(id);
    }
}
