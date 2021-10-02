import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Asset, IImageMeta } from "src/modules/asset/asset.entity";
import { Paginated } from "src/shared/Paginated";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PaginatedPlaylist } from "../playlist/playlist.entity";
import { GenreToPlaylist } from "./genre-to-playlist.entity";

@Entity({ name: "genres" })
@ObjectType()
export class Genre {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: string;

    @Column()
    @Field()
    name: string;

    @Column()
    @Field()
    coverImageId: string;

    @OneToOne(() => Asset)
    @JoinColumn()
    @Field(() => Asset)
    coverImage: Asset<IImageMeta>;

    @OneToMany(() => GenreToPlaylist, genreToPlaylist => genreToPlaylist.genre)
    genreToPlaylists!: GenreToPlaylist[];

    @Field(() => PaginatedPlaylist)
    playlists: PaginatedPlaylist;
}

@ObjectType()
export class PaginatedGenre extends Paginated(Genre) {}
