
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export abstract class IQuery {
    abstract artists(): Nullable<Nullable<Artist>[]> | Promise<Nullable<Nullable<Artist>[]>>;
}

export class Artist {
    id?: Nullable<number>;
    name?: Nullable<string>;
    biography?: Nullable<string>;
    isVerified?: Nullable<boolean>;
}

type Nullable<T> = T | null;
