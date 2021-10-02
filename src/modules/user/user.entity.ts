import { Field, ID, ObjectType } from "@nestjs/graphql";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";
import { UserToSocialProvider } from "./user-to-social-provider.entity";

@Entity({ name: "users" })
@ObjectType()
export class User {
    @PrimaryGeneratedColumn()
    @Field(type => ID)
    id: string;

    @Column()
    @Field()
    name: string;

    @CreateDateColumn()
    @Field()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => UserToSocialProvider, userToSocialProvider => userToSocialProvider.user)
    public userToSocialProviders!: UserToSocialProvider[];
}

@ObjectType()
export class UserWithAccessToken {
    @Field(type => User)
    user: User;

    @Field()
    accessToken: string;
}
