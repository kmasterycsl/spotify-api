import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getManager, Repository } from "typeorm";
import { Likeable, LikeableType } from "../likeable/likeable.entity";
import { User } from "../user/user.entity";
import { CreatePlaylistArgs } from "./args/CreatePlaylist.arg";
import { PlaylistToTrack } from "./playlist-to-track.entity";
import { Playlist } from "./playlist.entity";

@Injectable()
export class PlaylistService {
    constructor(
        @InjectRepository(Playlist)
        private playlistsRepository: Repository<Playlist>,
        @InjectRepository(PlaylistToTrack)
        private playlistToTrackRepository: Repository<PlaylistToTrack>
    ) {}

    findOneById(id: string): Promise<Playlist> {
        return this.playlistsRepository.findOne(id);
    }

    async createPlaylist(arg: CreatePlaylistArgs, user: User) {
        const playlist = await getManager().transaction(async txnEntityManager => {
            // Create playlist
            const playlist = new Playlist();
            playlist.name = arg.name;
            playlist.userId = user.id;
            await txnEntityManager.save(playlist);

            // Auto like own playlist
            const likeable = new Likeable();
            likeable.likeableId = playlist.id;
            likeable.likeableType = LikeableType.PLAYLIST;
            likeable.userId = user.id;
            await txnEntityManager.save(likeable);

            return playlist;
        });

        return playlist;
    }
}
