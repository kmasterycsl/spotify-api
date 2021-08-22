
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum AssetType {
    IMAGE = "IMAGE"
}

export abstract class IQuery {
    abstract artists(): Nullable<Nullable<Artist>[]> | Promise<Nullable<Nullable<Artist>[]>>;

    abstract artist(id: string): Nullable<Artist> | Promise<Nullable<Artist>>;

    abstract asset(id: string): Nullable<Asset> | Promise<Nullable<Asset>>;
}

export class Artist {
    id?: Nullable<number>;
    name?: Nullable<string>;
    biography?: Nullable<string>;
    isVerified?: Nullable<boolean>;
    coverImage: Asset;
    avatarImage: Asset;
}

export class Asset {
    id?: Nullable<number>;
    type?: Nullable<AssetType>;
    meta?: Nullable<AssetMeta>;
}

export class AssetMeta {
    source?: Nullable<string>;
    width?: Nullable<number>;
    height?: Nullable<number>;
}

type Nullable<T> = T | null;
