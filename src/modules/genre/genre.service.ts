import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
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

    find(): Promise<Genre[]> {
        return this.genresRepository.find();
    }

    findOneById(id: string): Promise<Genre> {
        return this.genresRepository.findOne(id);
    }
}
