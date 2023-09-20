import {Directive, EventEmitter, Input, Output} from '@angular/core';

@Directive({
  selector: 'th[sortable]',
  host: {
    '[style.cursor]': '"pointer"',
    '[class.asc]': 'ascending === true',
    '[class.default]': 'ascending === null',
    '[class.desc]': 'ascending === false',
    '(click)': 'rotate()'
  }
})
export class SortableDirective {

  @Input()
  sortable?: string;

  @Output()
  sort = new EventEmitter<any>();

  ascending: boolean = true;

  rotate(): void {

    this.ascending = !this.ascending;
    this.sort.emit({column: this.sortable, ascending: this.ascending});
  }
}
