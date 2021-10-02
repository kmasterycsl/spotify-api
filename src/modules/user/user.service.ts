import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserToSocialProvider } from "./user-to-social-provider.entity";
import { User } from "./user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectRepository(UserToSocialProvider)
        private userToSocialProviderRepository: Repository<UserToSocialProvider>
    ) {}

    findOneById(id: string): Promise<User> {
        return this.usersRepository.findOneOrFail(id);
    }

    async findUserBySocialInfo(
        providerId: string,
        providerUserId: string
    ): Promise<User | undefined> {
        const userToSocialProvider = await this.userToSocialProviderRepository.findOne({
            socialProviderId: providerId,
            socialProviderUserId: providerUserId,
        });

        if (!userToSocialProvider) {
            return undefined;
        }

        return this.usersRepository.findOne(userToSocialProvider.userId);
    }

    async createUserWithSocialInfo(
        name: string,
        providerId: string,
        providerUserId: string
    ): Promise<User> {
        const user = await this.usersRepository.save({ name });
        await this.userToSocialProviderRepository.save({
            userId: user.id,
            socialProviderId: providerId,
            socialProviderUserId: providerUserId,
            socialProviderUserName: name,
        });
        return user;
    }
}
