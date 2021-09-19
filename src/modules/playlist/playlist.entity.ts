import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Paginated } from "src/shared/Paginated";
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
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
    userId: string;

    @OneToMany(() => PlaylistToTrack, playlistToTrack => playlistToTrack.playlist)
    playlistToTracks!: PlaylistToTrack[];

    @ManyToOne(() => User, user => user)
    user!: User;

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
