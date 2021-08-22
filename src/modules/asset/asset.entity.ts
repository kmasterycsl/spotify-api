import { ObjectType, ID, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum AssetType {
  IMAGE = 'IMAGE',
}

export interface IImageMeta {
  source: string;
  width: number;
  height: number;
}

@ObjectType()
@Entity({ name: 'assets' })
export class Asset<T extends IImageMeta> {
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
