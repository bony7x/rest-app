import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {ExtendedRequestModel, Pageable, Sortable} from "../../../model/extended-request.model";
import {BookCategoriesService} from "../../../services/book-categories.service";
import {BookCategoryResponse} from "../../../responses/BookCategoryResponse";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-book-categories-list',
  templateUrl: './book-categories-list.component.html',
  styleUrls: ['./book-categories-list.component.css']
})
export class BookCategoriesListComponent implements OnDestroy {

  @Input()
  categoryResponse: BookCategoryResponse;

  @Output()
  editCategory = new EventEmitter<number>();

  subscriptions: Subscription = new Subscription();
  sortable: Sortable
  pageable: Pageable
  column: string = 'id';
  asc: boolean = true;
  extendedRequest: ExtendedRequestModel;
  numbers: number[] = [5, 10, 15, 20, 25, 50, 100]
  pageNumber: number = 1;
  pageSize: number = 5;
  totalCount: number;

  @Output()
  paginationChange = new EventEmitter<number>();

  constructor(private bookCategoryService: BookCategoriesService) {
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onPageChange(pageNumber: number): void {
    this.pageable = new Pageable(pageNumber, this.pageSize)
    this.sortable = new Sortable(this.column, this.asc);
    this.extendedRequest = new ExtendedRequestModel(this.sortable, this.pageable);
    this.subscriptions.add(
      this.bookCategoryService.getBookCategories(this.extendedRequest).subscribe(response => this.categoryResponse = response));
  }

  sort(sortBy: any) {
    this.column = sortBy.column;
    this.asc = sortBy.ascending;
    if (sortBy.ascending === undefined) {
      this.sortable = new Sortable('id', true);
    } else {
      this.sortable = new Sortable(sortBy.column, sortBy.ascending);
    }
    this.pageable = new Pageable(1, this.pageSize);
    this.extendedRequest = new ExtendedRequestModel(this.sortable, this.pageable);
    this.subscriptions.add(
      this.bookCategoryService.getBookCategories(this.extendedRequest).subscribe(response => {
        this.categoryResponse = response;
        this.pageNumber = response.pageNumber;
        this.pageSize = response.pageSize;
        this.totalCount = response.totalCount;
      }));
  }

  changeListingCount(count: number): void {
    this.pageSize = count;
    this.pageNumber = 1;
    this.sortable = new Sortable('id', true);
    this.pageable = new Pageable(this.pageNumber, this.pageSize);
    this.extendedRequest = new ExtendedRequestModel(this.sortable, this.pageable);
    this.subscriptions.add(
      this.bookCategoryService.getBookCategories(this.extendedRequest).subscribe(response => {
        this.categoryResponse = response;
        this.pageNumber = response.pageNumber;
        this.pageSize = response.pageSize;
        this.totalCount = response.totalCount;
      }));
  }

  protected readonly Number = Number;
}
