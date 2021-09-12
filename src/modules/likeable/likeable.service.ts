import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TrackService } from "../track/track.service";
import { User } from "../user/user.entity";
import { LikeArgs } from "./args/Like.arg";
import { Likeable, LikeableType } from "./likeable.entity";

@Injectable()
export class LikeableService {
    constructor(
        @InjectRepository(Likeable)
        private likeablesRepository: Repository<Likeable>,
        private tracksService: TrackService
    ) {}

    async like(arg: LikeArgs, user: User) {
        switch (arg.likeableType) {
            case LikeableType.TRACK:
                const track = await this.tracksService.findOneById(arg.likeableId);
                if (!track) throw new BadRequestException();
                const existedLikeable = await this.findOneLikable(
                    arg.likeableType,
                    track.id,
                    user.id
                );
                if (existedLikeable) {
                    await this.likeablesRepository.delete(existedLikeable);
                    return false;
                } else {
                    const likeable = new Likeable();
                    likeable.likeableId = track.id;
                    likeable.likeableType = arg.likeableType;
                    likeable.userId = user.id;

                    await this.likeablesRepository.save(likeable);
                    return true;
                }
            default:
                throw new BadRequestException();
        }
    }

    async findOneLikable(
        likeableType: LikeableType,
        likeableId: string,
        userId: string
    ): Promise<Likeable | null> {
        const likeable = await this.likeablesRepository.findOne({
            likeableId,
            likeableType,
            userId,
        });

        return likeable;
    }
}
