import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Asset, IImageMeta } from 'src/modules/asset/asset.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { Paginated } from 'src/shared/Paginated';
import { PaginatedTrack, Track } from 'src/track/track.entity';
import { ArtistToTrack } from 'src/track/artist-to-track.entity';

@Entity({ name: 'artists' })
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

  @Field(type => PaginatedTrack)
  tracks: PaginatedTrack;
}

@ObjectType()
export class PaginatedArtist extends Paginated(Artist) { }