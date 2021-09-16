import { Field, ObjectType, Int } from "@nestjs/graphql";
import { Type } from "@nestjs/common";
import { IPaginationMeta } from "nestjs-typeorm-paginate";

export interface IPaginatedType<T> {
    items: T[];
    pageInfo: IPaginationMeta;
}

@ObjectType(`PaginationMeta`)
abstract class PaginatedMetaEdgeType {
    @Field(type => Number)
    itemCount: number;
    @Field(type => Number)
    totalItems: number;
    @Field(type => Number)
    itemsPerPage: number;
    @Field(type => Number)
    totalPages: number;
    @Field(type => Number)
    currentPage: number;
}

export function Paginated<T>(classRef: Type<T>): Type<IPaginatedType<T>> {
    @ObjectType({ isAbstract: true })
    abstract class PaginatedType implements IPaginatedType<T> {
        @Field(type => [classRef], { nullable: false })
        items: T[];

        @Field(type => PaginatedMetaEdgeType)
        pageInfo: PaginatedMetaEdgeType;
    }
    return PaginatedType as Type<IPaginatedType<T>>;
}
8;
