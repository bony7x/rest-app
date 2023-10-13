import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Pageable, Sortable} from "../../../model/extended-request.model";
import {BookCategoryResponse} from "../../../responses/BookCategoryResponse";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'app-book-categories-list',
  templateUrl: './book-categories-list.component.html',
  styleUrls: ['./book-categories-list.component.css']
})
export class BookCategoriesListComponent implements OnInit {

  @Input()
  categoryResponse: BookCategoryResponse;

  sortable: Sortable
  pageable: Pageable
  column: string = 'id';
  numbers: number[] = [5, 10, 15, 20, 25, 50, 100]
  isAdmin: boolean = false;

  @Output()
  listingChange = new EventEmitter<Pageable>();

  @Output()
  sortingChange = new EventEmitter<Sortable>();

  @Output()
  editCategory = new EventEmitter<number>();

  @Output()
  categoryDetail = new EventEmitter<number>();

  @Output()
  deleteCategory = new EventEmitter<number>();

  constructor(
    private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.isAdminFn();
  }

  sort(sortBy: any) {
    this.column = sortBy.column;
    this.sortable = new Sortable(sortBy.column, sortBy.ascending);
    this.sortingChange.emit(this.sortable);
  }

  changeListingCount(count: number): void {
    this.pageable = new Pageable(1, count);
    this.listingChange.emit(this.pageable);
  }

  isAdminFn() {
    if (this.authService.getUserRole() === 'USER') {
      this.isAdmin = false;
    }
    if (this.authService.getUserRole() === 'ADMINISTRATOR') {
      this.isAdmin = true;
    }
  }

  protected readonly Number = Number;
}
