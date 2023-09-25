
export class ExtendedRequestModel {

  sortable: Sortable
  pageable: Pageable

  constructor(sortable: Sortable, pageable: Pageable) {
    this.sortable = sortable;
    this.pageable = pageable;
  }
}

export class Pageable {
  pageNumber: number
  pageSize: number
  totalCount: number;

  constructor(pageNumber: number, pageSize: number) {
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
  }
}

export class Sortable{
  column: string
  ascending: boolean

  constructor(column: string, ascending: boolean) {
    this.column = column;
    this.ascending = ascending;
  }
}
