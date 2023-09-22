import {Component, EventEmitter, OnDestroy, OnInit, Output, TemplateRef} from '@angular/core';
import {BookCategory, BookCategoryCreate} from "../../model/bookCategory";
import {BookCategoriesService} from "../../services/book-categories.service";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Subscription} from "rxjs";
import {ToastService} from "angular-toastify";
import {Sortable} from "../../model/sortable";
import {Extendedrequest} from "../../model/extendedrequest";
import {Pageable} from "../../model/pageable";
import {BookCategoryResponse} from "../../responses/BookCategoryResponse";

@Component({
  selector: 'app-book-page-categories',
  templateUrl: './book-categories-page.component.html',
  styleUrls: ['./book-categories-page.component.css']
})
export class BookCategoriesPageComponent implements OnInit, OnDestroy {

  categoryReponse: BookCategoryResponse;

  subscriptions: Subscription = new Subscription();
  pageNumber: number = 1;
  pageSize: number = 5;
  sortable: Sortable = new Sortable('id',true);
  pageable: Pageable = new Pageable(this.pageNumber,this.pageSize)
  extendedRequest: Extendedrequest = new Extendedrequest(this.sortable,this.pageable);

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
    this.subscriptions.add(
      this.bookCategoriesService.getBookCategories(this.extendedRequest)
      .subscribe(response => {
        this.categoryReponse = response;
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
