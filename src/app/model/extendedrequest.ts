import {Sortable} from "./sortable";
import {Pageable} from "./pageable";

export class Extendedrequest {

  sortable: Sortable
  pageable: Pageable

  constructor(sortable: Sortable, pageable: Pageable) {
    this.sortable = sortable;
    this.pageable = pageable;
  }
}
