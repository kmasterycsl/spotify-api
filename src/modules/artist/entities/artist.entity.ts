import { Asset, IImageMeta } from 'src/modules/asset/entities/asset.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'artists' })
export class Artist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  biography: string;

  @Column({ default: true })
  isVerified: boolean;

  @OneToOne(() => Asset)
  @JoinColumn()
  coverImage: Asset<IImageMeta>;

  @OneToOne(() => Asset)
  @JoinColumn()
  avatarImage: Asset<IImageMeta>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}