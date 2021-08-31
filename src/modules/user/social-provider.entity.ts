import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { UserToSocialProvider } from './user-to-social-provider.entity';

export enum SUPPORTED_SOCIAL_PROVIDERS {
  GOOGLE = 'GOOGLE',
  FACEBOOK = 'FACEBOOK',
}

@Entity({ name: 'socialProviders' })
export class SocialProvider {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @OneToMany(() => UserToSocialProvider, userToSocialProvider => userToSocialProvider.socialProvider)
  public userToSocialProviders!: UserToSocialProvider[];
}
