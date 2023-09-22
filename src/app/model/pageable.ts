export class Pageable {
  pageNumber: number
  pageSize: number
  totalCount: number;

  constructor(pageNumber: number, pageSize: number) {
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
  }
}
