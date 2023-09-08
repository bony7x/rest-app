import {Component, Input, OnInit} from '@angular/core';
import {Book} from "../../model/book.model";
import {ActivatedRoute} from "@angular/router";
import {BooksService} from "../../books.service";
import {Location} from "@angular/common";
import {BookCategoriesService} from "../../book-categories.service";
import {BookCategory} from "../../model/bookCategory";
import {Observable} from "rxjs";

@Component({
  selector: 'app-book-detail-page',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail-page.component.css']
})
export class BookDetailComponent implements OnInit {

  @Input() book?: Book;

  bookCategory?: Observable<BookCategory>;

  private bookId: number;

  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService,
    private location: Location,
    private bookCategoriesService: BookCategoriesService) {
  }

  ngOnInit(): void {
    this.bookId = Number.parseInt(this.route.snapshot.paramMap.get('id')!);
    this.getBook();
  }

  getBook(): void {
    this.booksService.getBook(this.bookId)
      .subscribe(book => this.book = book);
  }

  updateBook(name: string, author: string, count: number): void {
    if (this.book) {
      this.book = {
        ...this.book,
        name,
        author,
        count
      }
      this.booksService.updateBook(this.bookId, this.book)
        .subscribe(() => this.goBack());
    }
  }

  delete(book: Book): void {
    this.booksService.deleteBook(book.id).subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.book) {
      // this.booksService.updateBook(this.book)
      //   .subscribe(() => this.goBack());
    }
  }

  addCategoryToBook(id: number): void {
    if (this.book) {
      this.booksService.addCategoryToBook(this.book.id, id)
        .subscribe();
    }
  }

  removeCategoryFromBook(id: number) {
    if (this.book) {
      this.booksService.removeCategoryFromBook(this.book.id, id)
        .subscribe();
    }
  }


  protected readonly Number = Number;
}
