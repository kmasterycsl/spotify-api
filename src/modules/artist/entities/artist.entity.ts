import { AssetEntity, IImageMeta } from 'src/modules/asset/entities/asset.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'artists' })
export class ArtistEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  biography: string;

  @Column({ default: true })
  isVerified: boolean;

  @OneToOne(() => AssetEntity, {eager: true})
  @JoinColumn()
  coverImage: AssetEntity<IImageMeta>;

  @OneToOne(() => AssetEntity, {eager: true})
  @JoinColumn()
  avatarImage: AssetEntity<IImageMeta>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}