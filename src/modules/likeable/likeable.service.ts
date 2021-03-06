import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { paginate } from "nestjs-typeorm-paginate";
import { PaginationArgs } from "src/shared/args/PaginationArgs";
import { Pagination } from "src/shared/Pagination";
import convertToCustomPagination from "src/shared/utils/convertToCustomPagination";
import { Repository } from "typeorm";
import { AlbumService } from "../album/album.service";
import { ArtistService } from "../artist/artist.service";
import { PlaylistService } from "../playlist/playlist.service";
import { TrackService } from "../track/track.service";
import { User } from "../user/user.entity";
import { GetLikeablesArg } from "./args/GetLikeables.arg";
import { LikeArgs } from "./args/Like.arg";
import { Likeable, LikeableType } from "./likeable.entity";

@Injectable()
export class LikeableService {
    constructor(
        @InjectRepository(Likeable)
        private likeablesRepository: Repository<Likeable>,
        private playlistService: PlaylistService,
        private tracksService: TrackService,
        private albumsService: AlbumService,
        private artistsService: ArtistService
    ) {}

    async findByUserId(userId: string, args: GetLikeablesArg): Promise<Pagination<Likeable>> {
        const likeables = await paginate(this.likeablesRepository, args, {
            where: { userId, likeableType: args.likeableType },
            order: {
                createdAt: "DESC",
            },
        });
        return convertToCustomPagination(likeables);
    }

    async like(arg: LikeArgs, user: User) {
        let target;

        switch (arg.likeableType) {
            case LikeableType.PLAYLIST:
                target = await this.playlistService.findOneById(arg.likeableId);
                break;
            case LikeableType.TRACK:
                target = await this.tracksService.findOneById(arg.likeableId);
                break;
            case LikeableType.ALBUM:
                target = await this.albumsService.findOneById(arg.likeableId);
                break;
            case LikeableType.ARTIST:
                target = await this.artistsService.findOneById(arg.likeableId);
                break;
        }

        if (!target) throw new BadRequestException();

        const existedLikeable = await this.findOneLikable(
            arg.likeableType,
            arg.likeableId,
            user.id
        );

        if (existedLikeable) {
            await this.likeablesRepository.remove(existedLikeable);
            return false;
        } else {
            const likeable = new Likeable();
            likeable.likeableId = arg.likeableId;
            likeable.likeableType = arg.likeableType;
            likeable.userId = user.id;

            await this.likeablesRepository.save(likeable);
            return true;
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
