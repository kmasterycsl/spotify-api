import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Paginated } from "src/shared/Paginated";
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { Asset, IImageMeta } from "../asset/asset.entity";
import { PaginatedTrack } from "../track/track.entity";
import { User } from "../user/user.entity";
import { PlaylistToTrack } from "./playlist-to-track.entity";

@Entity({ name: "playlists" })
@ObjectType()
export class Playlist {
    @PrimaryGeneratedColumn()
    @Field(type => ID)
    id: string;

    @Column()
    @Field()
    name: string;

    @Column()
    @Field()
    userId: string;

    @OneToMany(() => PlaylistToTrack, playlistToTrack => playlistToTrack.playlist)
    playlistToTracks!: PlaylistToTrack[];

    @ManyToOne(() => User, user => user, { onUpdate: "CASCADE", onDelete: "CASCADE" })
    user!: User;

    @Column({ nullable: true })
    @Field({ nullable: true })
    coverImageId?: string;

    @OneToOne(() => Asset)
    @JoinColumn()
    @Field(type => Asset, { nullable: true })
    coverImage?: Asset<IImageMeta>;

    @CreateDateColumn()
    @Field()
    createdAt: Date;

    @UpdateDateColumn()
    @Field()
    updatedAt: Date;

    @Field()
    tracksCount: number;

    @Field(type => PaginatedTrack)
    tracks: PaginatedTrack;
}

@ObjectType()
export class PaginatedPlaylist extends Paginated(Playlist) {}
