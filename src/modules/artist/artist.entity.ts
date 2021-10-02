import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ArtistToTrack } from "src/modules/artist/artist-to-track.entity";
import { Asset, IImageMeta } from "src/modules/asset/asset.entity";
import { PaginatedTrack } from "src/modules/track/track.entity";
import { Paginated } from "src/shared/Paginated";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Album } from "../album/album.entity";

@Entity({ name: "artists" })
@ObjectType()
export class Artist {
    @PrimaryGeneratedColumn()
    @Field(type => ID)
    id: string;

    @Column()
    @Field()
    name: string;

    @Column()
    @Field()
    biography: string;

    @Column({ default: false })
    @Field()
    isVerified: boolean;

    @Column()
    @Field()
    coverImageId: string;

    @OneToOne(() => Asset)
    @JoinColumn()
    @Field(type => Asset)
    coverImage: Asset<IImageMeta>;

    @Column()
    @Field()
    avatarImageId: string;

    @OneToOne(() => Asset)
    @JoinColumn()
    @Field(type => Asset)
    avatarImage: Asset<IImageMeta>;

    @OneToMany(() => ArtistToTrack, artistToTrack => artistToTrack.artist)
    artistToTracks!: ArtistToTrack[];

    @OneToMany(() => Album, album => album.artist)
    albums!: Album[];

    @Field(type => PaginatedTrack)
    tracks: PaginatedTrack;

    @Field(type => Boolean)
    isLiked: boolean;
}

@ObjectType()
export class PaginatedArtist extends Paginated(Artist) {}
