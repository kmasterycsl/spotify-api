import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Paginated } from "src/shared/Paginated";
import { CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Album } from "../album/album.entity";
import { Artist } from "../artist/artist.entity";
import { Playlist } from "../playlist/playlist.entity";
import { Track } from "../track/track.entity";
import { User } from "../user/user.entity";

@Entity({ name: "likeables" })
@ObjectType()
export class Likeable {
    @PrimaryColumn()
    @Field()
    likeableId: string;

    @PrimaryColumn()
    @Field()
    likeableType: LikeableType;

    @PrimaryColumn()
    @Field()
    userId: string;

    @ManyToOne(() => User, user => user)
    public user!: User;

    @CreateDateColumn()
    @Field()
    createdAt: Date;

    @UpdateDateColumn()
    @Field()
    updatedAt: Date;

    @Field({ nullable: true })
    album?: Album;

    @Field({ nullable: true })
    artist?: Artist;

    @Field({ nullable: true })
    track?: Track;

    @Field({ nullable: true })
    playlist?: Playlist;
}

export enum LikeableType {
    "TRACK" = "TRACK",
    "ALBUM" = "ALBUM",
    "ARTIST" = "ARTIST",
    "PLAYLIST" = "PLAYLIST",
}

registerEnumType(LikeableType, {
    name: "LikeableType",
});

@ObjectType()
export class PaginatedLikeable extends Paginated(Likeable) {}
