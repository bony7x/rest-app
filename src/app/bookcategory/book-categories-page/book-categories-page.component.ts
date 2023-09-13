import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {BookCategory, BookCategoryCreate} from "../../model/bookCategory";
import {BookCategoriesService} from "../../services/book-categories.service";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Subscription} from "rxjs";
import {ToastService} from "angular-toastify";

@Component({
  selector: 'app-book-page-categories',
  templateUrl: './book-categories-page.component.html',
  styleUrls: ['./book-categories-page.component.css']
})
export class BookCategoriesPageComponent implements OnInit, OnDestroy {

  bookCategories: BookCategory[] = [];

  private subscriptions: Subscription = new Subscription();

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
      this.bookCategoriesService.getBookCategories()
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
