import { Pagination as BasePagination } from "nestjs-typeorm-paginate";
import { Pagination } from "../Pagination";

export default function convertToCustomPagination<T>(pagination: BasePagination<T>): Pagination<T> {
    return new Pagination(pagination.items, pagination.meta);
}
