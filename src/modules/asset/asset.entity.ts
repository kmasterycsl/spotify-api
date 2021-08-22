import { ObjectType, ID, Field, createUnionType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum AssetType {
  IMAGE = 'IMAGE',
  SOUND = 'SOUND',
}

export interface IImageMeta {
  source: string;
  width: number;
  height: number;
}

export interface ISoundMeta {
  source: string;
  length: number;
}

export type AssetMetaType = IImageMeta | ISoundMeta

export const AssetMetaUnion = createUnionType({
  name: 'AssetMetaUnion',
  types: () => [ImageMeta, SoundMeta],
  resolveType(asset: AssetMetaType) {
    if ((asset as ISoundMeta).length) {
      return SoundMeta;
    }
    if ((asset as IImageMeta).width && (asset as IImageMeta).height) {
      return ImageMeta;
    }

    return null;
  },
});

@ObjectType()
@Entity({ name: 'assets' })
export class Asset<T extends AssetMetaType> {
  @PrimaryGeneratedColumn("uuid")
  @Field(type => ID)
  id: string;

  @Column({ type: 'enum', enum: AssetType })
  @Field()
  type: AssetType;

  @Column({ type: 'simple-json' })
  @Field(type => AssetMetaUnion)
  meta: T;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@ObjectType()
export class ImageMeta {
  @Field()
  source: string;

  @Field()
  width: number;

  @Field()
  height: number;
}

@ObjectType()
export class SoundMeta {
  @Field()
  source: string;

  @Field()
  length: number;
}
