import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Asset, IImageMeta, ISoundMeta } from 'src/modules/asset/asset.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Paginated } from 'src/shared/Paginated';
import { ArtistToTrack } from './artist-to-track.entity';

@Entity({ name: 'tracks' })
@ObjectType()
export class Track {
  @PrimaryGeneratedColumn()
  @Field(type => ID)
  id: string;

  @Column()
  @Field()
  name: string;


  @OneToOne(() => Asset, { eager: true })
  @JoinColumn()
  @Field(type => Asset)
  sound: Asset<ISoundMeta>;

  @OneToMany(() => ArtistToTrack, artistToTrack => artistToTrack.track)
  public artistToTracks!: ArtistToTrack[];
}

@ObjectType()
export class PaginatedTrack extends Paginated(Track) { }