import {Component, EventEmitter, OnDestroy, OnInit, Output, TemplateRef} from '@angular/core';
import {BookCategory, BookCategoryCreate} from "../../../model/bookCategory";
import {BookCategoriesService} from "../../../services/book-categories.service";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Subscription} from "rxjs";
import {ToastService} from "angular-toastify";
import {ExtendedRequestModel, Pageable, Sortable} from "../../../model/extended-request.model";
import {BookCategoryResponse} from "../../../responses/BookCategoryResponse";
import {AuthenticationService} from "../../../services/authentication.service";
import {ConfirmDeletionModalComponent} from "../../../confirm-deletion-modal/confirm-deletion-modal.component";

@Component({
  selector: 'app-book-page-categories',
  templateUrl: './book-categories-page.component.html',
  styleUrls: ['./book-categories-page.component.css']
})
export class BookCategoriesPageComponent implements OnInit, OnDestroy {

  categoryResponse: BookCategoryResponse;
  subscriptions: Subscription = new Subscription();
  bookCategory: BookCategory[];
  pageNumber: number = 1;
  pageSize: number = 5;
  totalCount: number = 0;
  column: string = 'id';
  ascending: boolean = true;
  sortable: Sortable;
  pageable: Pageable;
  extendedRequest: ExtendedRequestModel;
  map = new Map<string, string>()
    .set('category', '');
  isAdmin: boolean;

  @Output()
  paginationChange = new EventEmitter<number>();

  constructor(
    private bookCategoriesService: BookCategoriesService,
    private router: Router,
    private modalService: NgbModal,
    private toastService: ToastService,
    private authService: AuthenticationService) {
  }


  ngOnInit(): void {
    this.getBookCategories();
    this.isAdminFn();
    this.bookCategoriesService.getBookCategoriesGET().subscribe(response => {
      this.bookCategory = response
    })
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getBookCategories(): void {
    this.pageable = new Pageable(this.pageNumber, this.pageSize);
    this.sortable = new Sortable(this.column, this.ascending);
    this.extendedRequest = new ExtendedRequestModel(this.sortable, this.pageable)
    this.extendedRequest.filter = Object.fromEntries(this.map);
    this.subscriptions.add(
      this.bookCategoriesService.getBookCategories(this.extendedRequest)
        .subscribe(response => {
          this.categoryResponse = response;
          this.pageSize = response.pageSize;
          this.pageNumber = response.pageNumber;
          this.totalCount = response.totalCount;
        }));
  }

  openModal(addCategoryModal: TemplateRef<any>): void {
    this.modalService.open(addCategoryModal);
  }

  onPageChange(pageNumber: number): void {
    this.pageNumber = pageNumber;
    this.getBookCategories();
  }

  onSortChange(sortable: Sortable): void {
    this.column = sortable.column;
    this.ascending = sortable.ascending
    this.pageNumber = 1;
    this.getBookCategories();
  }

  onListingChange(pageable: Pageable): void {
    this.pageNumber = pageable.pageNumber;
    this.pageSize = pageable.pageSize
    this.getBookCategories();
  }

  add(category: BookCategoryCreate): void {
    this.subscriptions.add(
      this.bookCategoriesService.addBookCategory(category)
        .subscribe(category => {
          this.getBookCategories();
          this.toastService.success('Successfully added a new book category!')
        }));
  }

  goBack(): void {
    this.router.navigate(['dashboard'])
  }

  editCategory(id: number): void {
    this.router.navigate(['book-categories', 'edit', id]);
  }

  showCategoryDetail(id: number): void {
    this.router.navigate(['book-categories', 'detail', id]);
  }

  isAdminFn() {
    if (this.authService.getUserRole() === 'USER') {
      this.isAdmin = false;
    }
    if (this.authService.getUserRole() === 'ADMINISTRATOR') {
      this.isAdmin = true;
    }
  }

  deleteCategory(id: number): void {
    const modal = this.modalService.open(ConfirmDeletionModalComponent)
    modal.closed.subscribe(result => {
      if (result) {
        this.subscriptions.add(
          this.bookCategoriesService.deleteBookCategory(id).subscribe(() => {
            this.toastService.success('Book category was successfully removed');
            this.getBookCategories();
          }))
      }
    });
  };

  filterCategories(map: Map<string, string>): void {
    this.map = map;
    this.getBookCategories();
  }
}
