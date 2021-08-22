import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Asset, IImageMeta } from 'src/modules/asset/asset.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Paginated } from 'src/shared/Paginated';

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

  @OneToOne(() => Asset, { eager: true })
  @JoinColumn()
  @Field(type => Asset)
  coverImage: Asset<IImageMeta>;

  @OneToOne(() => Asset, { eager: true })
  @JoinColumn()
  @Field(type => Asset)
  avatarImage: Asset<IImageMeta>;
}

@ObjectType()
export class PaginatedArtist extends Paginated(Artist) { }