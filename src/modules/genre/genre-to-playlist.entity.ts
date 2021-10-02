import { Column, Entity, ManyToOne } from "typeorm";
import { Playlist } from "../playlist/playlist.entity";
import { Genre } from "./genre.entity";

@Entity({ name: "genreToPlaylist" })
export class GenreToPlaylist {
    @Column({ primary: true })
    public genreId: string;

    @Column({ primary: true })
    public playlistId: string;

    @ManyToOne(() => Genre, genre => genre, { onDelete: "CASCADE" })
    public genre!: Genre;

    @ManyToOne(() => Playlist, playlist => playlist, { onDelete: "CASCADE" })
    public playlist!: Playlist;
}
