import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { paginate } from "nestjs-typeorm-paginate";
import { Pagination } from "src/shared/Pagination";
import convertToCustomPagination from "src/shared/utils/convertToCustomPagination";
import { FindManyOptions, Like, Repository } from "typeorm";
import { Album } from "./album.entity";
import { GetAlbumsArgs } from "./args/GetAlbums.args";

@Injectable()
export class AlbumService {
    constructor(
        @InjectRepository(Album)
        private albumsRepository: Repository<Album>
    ) {}

    find(args: GetAlbumsArgs): Promise<Pagination<Album>> {
        const cond: FindManyOptions<Album> = args.query
            ? {
                  where: {
                      name: Like(`%${args.query}%`),
                  },
              }
            : undefined;

        return paginate<Album>(
            this.albumsRepository,
            {
                limit: args.limit,
                page: args.page,
            },
            cond
        ).then(convertToCustomPagination);
    }

    findOneById(id: string): Promise<Album> {
        return this.albumsRepository.findOne(id);
    }
}
