import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {BookCategory, BookCategoryCreate} from "../../model/bookCategory";
import {BookCategoriesService} from "../../services/book-categories.service";
import {Router} from "@angular/router";
import {NgbModal, NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import {Subscription} from "rxjs";
import {ToastService} from "angular-toastify";
import {Sortable} from "../../model/sort.model";
import {ExtendedRequest} from "../../model/extended-request";
import {PaginationComponent} from "../../model/page";

@Component({
  selector: 'app-book-page-categories',
  templateUrl: './book-categories-page.component.html',
  styleUrls: ['./book-categories-page.component.css']
})
export class BookCategoriesPageComponent implements OnInit, OnDestroy {

  bookCategories: BookCategory[] = [];

  private subscriptions: Subscription = new Subscription();

  sortable: Sortable = new Sortable('id',true);
  pageable: PaginationComponent = new PaginationComponent(1,5)
  extendedRequest: ExtendedRequest = new ExtendedRequest(this.sortable,this.pageable);

  constructor(
    private bookCategoriesService: BookCategoriesService,
    private router: Router,
    private modalService: NgbModal,
    private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.getBookCategories();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getBookCategories(): void {
    this.subscriptions.add(
      this.bookCategoriesService.getBookCategories(this.extendedRequest)
      .subscribe(bookCategories => {
        this.bookCategories = bookCategories;
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
        this.getBookCategories();
        this.toastService.success('Successfully added a new book category!')
      }));
  }

  goBack(): void {
    this.router.navigate(['dashboard'])
  }

  editCategory(id: number): void {
    this.router.navigate(['book-categories', 'detail', id]);
  }
}
