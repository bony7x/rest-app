import {Component, EventEmitter, OnDestroy, OnInit, Output, TemplateRef} from '@angular/core';
import {BookCategory, BookCategoryCreate} from "../../model/bookCategory";
import {BookCategoriesService} from "../../services/book-categories.service";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Subscription} from "rxjs";
import {ToastService} from "angular-toastify";
import {ExtendedRequestModel, Pageable, Sortable} from "../../model/extended-request.model";
import {BookCategoryResponse} from "../../responses/BookCategoryResponse";

@Component({
  selector: 'app-book-page-categories',
  templateUrl: './book-categories-page.component.html',
  styleUrls: ['./book-categories-page.component.css']
})
export class BookCategoriesPageComponent implements OnInit, OnDestroy {

  categoryResponse: BookCategoryResponse;
  subscriptions: Subscription = new Subscription();
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  sortable: Sortable = new Sortable('id',true);
  pageable: Pageable;
  extendedRequest: ExtendedRequestModel;

  @Output()
  paginationChange = new EventEmitter<number>();

  constructor(
    private bookCategoriesService: BookCategoriesService,
    private router: Router,
    private modalService: NgbModal,
    private toastService: ToastService) {
  }


  ngOnInit(): void {
    this.getBookCategories(this.pageNumber);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getBookCategories(pageNumber: number): void {
    if (this.pageNumber === undefined || this.pageSize === undefined || Number.isNaN(pageNumber)) {
      this.pageable = new Pageable(1, 5)
    } else {
      this.pageable = new Pageable(pageNumber, this.pageSize)
    }
    this.sortable = new Sortable('id', true);
    this.extendedRequest = new ExtendedRequestModel(this.sortable, this.pageable)
    this.subscriptions.add(
      this.bookCategoriesService.getBookCategories(this.extendedRequest)
      .subscribe(response => {
        this.categoryResponse = response;
        this.pageSize = response.pageSize;
        this.pageNumber = response.pageNumber;
        this.totalCount = response.totalCount;
        this.toastService.success('Loaded book categories!')
      }));
  }

  openModal(addCategoryModal: TemplateRef<any>): void {
    this.modalService.open(addCategoryModal);
  }

  add(category: BookCategoryCreate): void {
    this.subscriptions.add(
      this.bookCategoriesService.addBookCategory(category)
      .subscribe(category => {
        this.getBookCategories(this.pageNumber);
        this.toastService.success('Successfully added a new book category!')
      }));
  }

  goBack(): void {
    this.router.navigate(['dashboard'])
  }

  editCategory(id: number): void {
    this.router.navigate(['book-categories', 'detail', id]);
  }

  onPageChange(pageNumber: number):void{
    this.getBookCategories(pageNumber)
  }

}
