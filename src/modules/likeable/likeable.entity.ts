import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
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
