import { Field } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, ManyToOne, UpdateDateColumn } from "typeorm";
import { Track } from "../track/track.entity";
import { Playlist } from "./playlist.entity";

@Entity({ name: "playlistToTrack" })
export class PlaylistToTrack {
    @Column({ primary: true })
    public playlistId: string;

    @Column({ primary: true })
    public trackId: string;

    @Column({ primary: true })
    public order: number;

    @ManyToOne(() => Playlist, playlist => playlist, {
        onDelete: "CASCADE",
    })
    public playlist!: Playlist;

    @ManyToOne(() => Track, track => track)
    public track!: Track;

    @CreateDateColumn()
    @Field()
    createdAt: Date;

    @UpdateDateColumn()
    @Field()
    updatedAt: Date;
}
