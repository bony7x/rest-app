import {Component, OnDestroy, OnInit} from '@angular/core';
import {Book} from "../../../model/book.model";
import {ActivatedRoute, Router} from "@angular/router";
import {BooksService} from "../../../services/books.service";
import {BookCategoriesService} from "../../../services/book-categories.service";
import {BookCategory} from "../../../model/bookCategory";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-book-page-detail-page',
  templateUrl: './book-detail-page.component.html',
  styleUrls: ['./book-detail-page.component.css']
})
export class BookDetailPageComponent implements OnInit, OnDestroy {

  book?: Book;

  bookCategoryList: BookCategory[] = [];

  private bookId: number;

  subscriptions: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private bookService: BooksService,
    private bookCategoriesService: BookCategoriesService,
    private router: Router) {
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

  routeCategoryUser(id: number) {
    this.router.navigate(['book-categories', 'detail', id]);
  }

  goBack(): void {
    this.router.navigate(['books'])
  }
}
