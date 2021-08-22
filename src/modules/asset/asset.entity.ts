import { ObjectType, ID, Field } from '@nestjs/graphql';
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

@ObjectType()
@Entity({ name: 'assets' })
export class Asset<T extends IImageMeta | ISoundMeta> {
  @PrimaryGeneratedColumn("uuid")
  @Field(type => ID)
  id: string;

  @Column({ type: 'enum', enum: AssetType })
  @Field()
  type: AssetType;

  @Column({ type: 'simple-json' })
  @Field(type => ImageMeta)
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
