import {Sortable} from "./sort.model";
import {PaginationComponent} from "./page";

export class ExtendedRequest{

  sortable: Sortable
  pageable: PaginationComponent

  constructor(sortable: Sortable, pageable: PaginationComponent) {
    this.sortable = sortable;
    this.pageable = pageable;
  }
}
