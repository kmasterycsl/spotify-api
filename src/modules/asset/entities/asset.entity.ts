import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum AssetType {
  IMAGE = 'IMAGE',
}

export interface IImageMeta {
  source: string;
  width: number;
  height: number;
}

@Entity({ name: 'assets' })
export class Asset<T extends IImageMeta> {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: 'enum', enum: AssetType })
  type: AssetType;

  @Column({ type: 'simple-json' })
  meta: T;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}