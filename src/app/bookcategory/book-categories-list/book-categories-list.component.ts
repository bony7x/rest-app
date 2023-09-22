import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BookCategory} from "../../model/bookCategory";
import {Sortable} from "../../model/sortable";
import {Extendedrequest} from "../../model/extendedrequest";
import {BookCategoriesService} from "../../services/book-categories.service";
import {Pageable} from "../../model/pageable";
import {BookCategoryResponse} from "../../responses/BookCategoryResponse";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-book-categories-list',
  templateUrl: './book-categories-list.component.html',
  styleUrls: ['./book-categories-list.component.css']
})
export class BookCategoriesListComponent {

  @Input()
  categoryResponse: BookCategoryResponse;

  @Output()
  editCategory = new EventEmitter<number>();

  subscriptions: Subscription = new Subscription();
  sortable: Sortable
  pageable: Pageable
  extendedRequest: Extendedrequest;
  numbers: number[] = [5, 10, 15, 20, 25, 50, 100]
  pageNumber: number = 1;
  pageSize: number = 5;

  @Output()
  paginationChange = new EventEmitter<number>();

  constructor(private bookCategoryService: BookCategoriesService) {
  }

  sort(sortBy: any) {
    this.sortable = new Sortable(sortBy.column, sortBy.ascending);
    this.pageable = new Pageable(this.pageNumber, this.pageSize);
    this.extendedRequest = new Extendedrequest(this.sortable, this.pageable);
    this.subscriptions.add(
    this.bookCategoryService.getBookCategories(this.extendedRequest).subscribe(response => this.categoryResponse= response));
  }

  onPageChange(pageNumber: number):void{
    this.paginationChange.emit(pageNumber);
  }

  changeListingCount(count: number): void {
    this.pageSize = count;
    this.sortable = new Sortable('id', true);
    this.pageable = new Pageable(this.pageNumber, this.pageSize);
    this.extendedRequest = new Extendedrequest(this.sortable, this.pageable);
    this.subscriptions.add(
    this.bookCategoryService.getBookCategories(this.extendedRequest).subscribe(response => this.categoryResponse= response));
  }

  protected readonly Number = Number;
}
