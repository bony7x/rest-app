import {Component, Input, OnInit} from '@angular/core';
import {Book, BookCreate} from "../../model/book.model";
import {ActivatedRoute} from "@angular/router";
import {BooksService} from "../../services/books.service";
import {Location} from "@angular/common";
import {BookCategoriesService} from "../../services/book-categories.service";
import {BookCategory} from "../../model/bookCategory";
import {Observable} from "rxjs";
import {BorrowingCreate} from "../../model/borrowing.model";

@Component({
  selector: 'app-book-page-detail-page',
  templateUrl: './book-detail-page.component.html',
  styleUrls: ['./book-detail-page.component.css']
})
export class BookDetailPageComponent implements OnInit {

  @Input() book?: Book;

  bookList: Book[]=[]

  bookCategory?: Observable<BookCategory>;

  bookCategoryList: BookCategory[]=[];


  private bookId: number;

  constructor(
    private route: ActivatedRoute,
    private bookService: BooksService,
    private location: Location,
    private bookCategoriesService: BookCategoriesService) {
  }

  ngOnInit(): void {
    this.bookId = Number.parseInt(this.route.snapshot.paramMap.get('id')!);
    this.getBook();
    this.getBooks()
    this.getBookCategories();
  }

  getBook(): void {
    this.bookService.getBook(this.bookId)
      .subscribe(book => this.book = book);
  }

  getBookCategories(): void {
    this.bookCategoriesService.getBookCategories()
      .subscribe(categories => this.bookCategoryList = categories);
  }

  updateBook(book: BookCreate): void {
    if (this.book) {
/*      this.book-page = {
        ...this.book-page,
        name,
        author,
        count
      }*/
      console.log(book);
      this.bookService.updateBook(this.bookId, book)
        .subscribe(response => this.book = response);
    }

/*    if (this.book-page) {
      this.bookService.updateBook(this.bookId, this.book-page)
        .subscribe(response => this.book-page = response);
    }*/
  }

  getBooks(): void {
    this.bookService.getBooks()
      .subscribe(books => this.bookList = books);
  }

  delete(book: Book): void {
    this.bookService.deleteBook(book.id).subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.book) {
      // this.bookService.updateBook(this.book-page)
      //   .subscribe(() => this.goBack());
    }
  }

  addCategoryToBook(id: number): void {
    if (this.book) {
      this.bookService.addCategoryToBook(this.book.id, id)
        .subscribe();
    }
  }

  removeCategoryFromBook(id: number) {
    if (this.book) {
      this.bookService.removeCategoryFromBook(this.book.id, id)
        .subscribe();
    }
  }


  protected readonly Number = Number;
  protected readonly onsubmit = onsubmit;
}
