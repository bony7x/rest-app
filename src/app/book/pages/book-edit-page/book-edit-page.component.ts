import {Component, OnDestroy, OnInit} from '@angular/core';
import {Book, BookCreate} from "../../../model/book.model";
import {BookCategory} from "../../../model/bookCategory";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {BooksService} from "../../../services/books.service";
import {BookCategoriesService} from "../../../services/book-categories.service";
import {ToastService} from "angular-toastify";

@Component({
  selector: 'app-book-edit-page',
  templateUrl: './book-edit-page.component.html',
  styleUrls: ['./book-edit-page.component.css']
})
export class BookEditPageComponent implements OnInit, OnDestroy {
  book?: Book;

  bookCategoryList: BookCategory[] = [];

  private bookId: number;

  subscriptions: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private bookService: BooksService,
    private bookCategoriesService: BookCategoriesService,
    private router: Router,
    private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.bookId = Number.parseInt(this.route.snapshot.paramMap.get('id')!);
    this.getBook();
    this.getBookCategories();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getBook(): void {
    this.subscriptions.add(
      this.bookService.getBook(this.bookId)
        .subscribe(book => {
          this.book = book[0];
        })
    );
  }

  getBookCategories(): void {
    this.subscriptions.add(
      this.bookCategoriesService.getBookCategoriesGET()
        .subscribe(categories => {
          this.bookCategoryList = categories;
        })
    );
  }

  updateBook(book: BookCreate): void {
    if (this.book) {
      this.subscriptions.add(
        this.bookService.updateBook(this.bookId, book)
          .subscribe(response => {
            this.book = response;
            this.toastService.success('Book was successfully updated!')
          }));
    }
  }

  updateCategory(categories: number[]): void {
    this.subscriptions.add(
      this.bookService.updateBookCategories(this.bookId, categories)
        .subscribe(response => {
          this.book = response;
          this.toastService.success('Category was successfully added to the book!')
        }));
  }

  routeCategoryAdmin(id: number): void {
    this.router.navigate(['book-categories', 'edit', id]);
  }

  routeBorrowingAdmin(id: number): void {
    this.router.navigate(['borrowings', 'edit', id]);
  }

  goBack(): void {
    this.router.navigate(['books'])
  }
}
