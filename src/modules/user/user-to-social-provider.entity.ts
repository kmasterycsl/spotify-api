import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { SocialProvider } from './social-provider.entity';
import { User } from './user.entity';

@Entity({ name: 'userToSocialProvider' })
export class UserToSocialProvider {
  @PrimaryColumn()
  public userId: string;

  @PrimaryColumn()
  public socialProviderId: string;

  @Column()
  public socialProviderUserId: string;

  @Column({ nullable: true })
  public socialProviderUserName: string;

  @Column({ nullable: true })
  public socialProviderUserEmail: string;

  @ManyToOne(() => User, user => user)
  public user!: User;

  @ManyToOne(() => SocialProvider, socialProvider => socialProvider)
  public socialProvider!: SocialProvider;
}
