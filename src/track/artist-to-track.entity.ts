import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Asset, IImageMeta, ISoundMeta } from 'src/modules/asset/asset.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Paginated } from 'src/shared/Paginated';
import { Artist } from 'src/modules/artist/artist.entity';
import { Track } from './track.entity';

@Entity({ name: 'artistToTrack' })
export class ArtistToTrack {
  @Column({ primary: true })
  public artistId: string;

  @Column({ primary: true })
  public trackId: string;

  @Column({ primary: true })
  public order: number;

  @ManyToOne(() => Artist, artist => artist)
  public artist!: Artist;

  @ManyToOne(() => Track, track => track)
  public track!: Track;
}
