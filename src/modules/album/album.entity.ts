import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Track } from 'src/modules/track/track.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from '../artist/artist.entity';
import { Asset, IImageMeta } from '../asset/asset.entity';

export enum AlbumType {
    SINGLE = 'SINGLE',
    COMPILATION = 'COMPILATION',
}

@Entity({ name: 'albums' })
@ObjectType()
export class Album {
    @PrimaryGeneratedColumn()
    @Field((type) => ID)
    id: string;

    @Column()
    @Field()
    name: string;

    @Column({ nullable: true })
    @Field()
    description: string;

    @Column({ type: 'enum', enum: AlbumType })
    @Field()
    type: AlbumType;

    @Column()
    @Field()
    coverImageId: string;

    @OneToOne(() => Asset)
    @JoinColumn()
    @Field(type => Asset)
    coverImage: Asset<IImageMeta>;

    @Column()
    @Field()
    artistId: string;

    @ManyToOne(() => Artist, artist => artist)
    public artist!: Artist;

    @OneToMany(() => Track, track => track.album)
    @Field((type) => [Track])
    tracks: Track[];
}
