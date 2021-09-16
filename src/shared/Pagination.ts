import { IPaginationLinks, IPaginationMeta, ObjectLiteral } from "nestjs-typeorm-paginate";

export class Pagination<PaginationObject, T extends ObjectLiteral = IPaginationMeta> {
    constructor(
        /**
         * a list of items to be returned
         */
        public items: PaginationObject[],
        /**
         * associated meta information (e.g., counts)
         */
        public pageInfo: T,
        /**
         * associated links
         */
        public links?: IPaginationLinks
    ) {}
}
