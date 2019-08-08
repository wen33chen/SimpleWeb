export interface PageList<T> {
  totalCount: number;
  totalPage: number;
  items: T[];
  pageSize: number;
  pageNumber: number;
}
