import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { paginate } from "nestjs-typeorm-paginate";
import { Pagination } from "src/shared/Pagination";
import convertToCustomPagination from "src/shared/utils/convertToCustomPagination";
import { Repository } from "typeorm";
import { GetGenresArgs } from "./args/GetGenres.arg";
import { GenreToPlaylist } from "./genre-to-playlist.entity";
import { Genre } from "./genre.entity";
@Injectable()
export class GenreService {
    constructor(
        @InjectRepository(Genre)
        private genresRepository: Repository<Genre>,
        @InjectRepository(GenreToPlaylist)
        private genreToPlaylistRepository: Repository<GenreToPlaylist>
    ) {}

    find(args: GetGenresArgs): Promise<Pagination<Genre>> {
        return paginate<Genre>(this.genresRepository, {
            limit: args.limit,
            page: args.page,
        }).then(convertToCustomPagination);
    }

    findOneById(id: string): Promise<Genre> {
        return this.genresRepository.findOne(id);
    }
}
