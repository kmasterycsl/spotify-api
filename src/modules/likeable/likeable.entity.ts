import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity({ name: 'likeables' })
export class Likeable {
  @PrimaryColumn()
  likeableId: string;

  @PrimaryColumn()
  likeableType: string;

  @PrimaryColumn()
  userId: string;

  @ManyToOne(() => User, (user) => user)
  public user!: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
