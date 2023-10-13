import {Directive, EventEmitter, Input, Output} from '@angular/core';

@Directive({
  selector: 'th[sortable]',
  host: {
    '[style.cursor]': '"pointer"',
    '[class.asc]': 'ascending === true',
    '[class.default]': 'ascending === undefined',
    '[class.desc]': 'ascending === false',
    '(click)': 'rotate()'
  }
})
export class SortableDirective {

  @Input()
  sortable?: string;

  @Output()
  sort = new EventEmitter<any>();

  ascending?: boolean = undefined;

  @Input()
  set shouldSort(actualColumn: string | undefined) {
    if (this.ascending !== undefined && actualColumn && actualColumn !== this.sortable) {
      this.ascending = undefined;
    }
  }

  rotate(): void {
    if (this.ascending === undefined) {
      this.ascending = true;
    } else if (this.ascending) {
      this.ascending = false;
    } else if (!this.ascending) {
      this.ascending = undefined;
    }
    this.sort.emit({column: this.sortable, ascending: this.ascending});
  }
}
