import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Asset, IImageMeta, ISoundMeta } from 'src/modules/asset/asset.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import { Paginated } from 'src/shared/Paginated';
import { ArtistToTrack } from '../artist/artist-to-track.entity';
import { Album } from '../album/album.entity';

@Entity({ name: 'tracks' })
@ObjectType()
export class Track {
    @PrimaryGeneratedColumn()
    @Field(type => ID)
    id: string;

    @Column()
    @Field()
    name: string;

    @Column()
    @Field()
    albumId: string;

    @ManyToOne(() => Album, album => album)
    public album!: Album;

    @OneToOne(() => Asset, { eager: true })
    @JoinColumn()
    @Field(type => Asset)
    sound: Asset<ISoundMeta>;

    @OneToMany(() => ArtistToTrack, artistToTrack => artistToTrack.track)
    public artistToTracks!: ArtistToTrack[];
}

@ObjectType()
export class PaginatedTrack extends Paginated(Track) { }