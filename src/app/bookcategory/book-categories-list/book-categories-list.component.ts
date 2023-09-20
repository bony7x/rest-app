import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BookCategory} from "../../model/bookCategory";
import {Sortable} from "../../model/sort.model";
import {ExtendedRequest} from "../../model/extended-request";
import {BookCategoriesService} from "../../services/book-categories.service";
import {PaginationComponent} from "../../model/page";

@Component({
  selector: 'app-book-categories-list',
  templateUrl: './book-categories-list.component.html',
  styleUrls: ['./book-categories-list.component.css']
})
export class BookCategoriesListComponent {

  @Input()
  categories: BookCategory[] = [];

  @Output()
  editCategory = new EventEmitter<number>();

  sortable: Sortable = new Sortable('id', true);
  pageable: PaginationComponent = new PaginationComponent(1, 5)
  extendedRequest: ExtendedRequest = new ExtendedRequest(this.sortable, this.pageable);
  numbers: number[] = [5, 10, 15, 20, 25, 50, 100]
  page: number = 1;
  pageSize: number = 5;

  constructor(private bookCategoryService: BookCategoriesService) {
  }

  sort(sortBy: any) {
    this.sortable = new Sortable(sortBy.column, sortBy.ascending);
    this.extendedRequest = new ExtendedRequest(this.sortable, this.pageable);
    this.bookCategoryService.getBookCategories(this.extendedRequest).subscribe(categories => this.categories = categories)
  }

  changeListingCount(count: number): void {
    this.pageSize = count;
    this.sortable = new Sortable('id', true);
    this.pageable = new PaginationComponent(this.page, this.pageSize);
    this.extendedRequest = new ExtendedRequest(this.sortable, this.pageable);
    this.bookCategoryService.getBookCategories(this.extendedRequest).subscribe(categories => this.categories = categories)
  }

  protected readonly Number = Number;
}
