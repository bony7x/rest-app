import {Component, Input, OnInit} from '@angular/core';
import {Book, BookCreate} from "../../model/book.model";
import {ActivatedRoute, Router} from "@angular/router";
import {BooksService} from "../../services/books.service";
import {BookCategoriesService} from "../../services/book-categories.service";
import {BookCategory} from "../../model/bookCategory";
import {read} from "@popperjs/core";

@Component({
  selector: 'app-book-page-detail-page',
  templateUrl: './book-detail-page.component.html',
  styleUrls: ['./book-detail-page.component.css']
})
export class BookDetailPageComponent implements OnInit {

  @Input()
  book?: Book;

  bookList: Book[] = []

  bookCategoryList: BookCategory[] = [];

  selectedBookCategoryList: BookCategory[] = [];

  private bookId: number;

  constructor(
    private route: ActivatedRoute,
    private bookService: BooksService,
    private bookCategoriesService: BookCategoriesService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.bookId = Number.parseInt(this.route.snapshot.paramMap.get('id')!);
    this.getBook();
    this.getBooks()
    this.getBookCategories();
    this.getSelectedBookCategories();
  }

  getBook(): void {
    this.bookService.getBook(this.bookId)
      .subscribe(book => this.book = book);
  }

  getBookCategories(): void {
    this.bookCategoriesService.getBookCategories()
      .subscribe(categories => this.bookCategoryList = categories);
  }

  getSelectedBookCategories(): void {
    this.bookService.getBook(this.bookId)
      .subscribe(response => {this.selectedBookCategoryList = response.categories})
  }

  updateBook(book: BookCreate): void {
    if (this.book) {
      this.bookService.updateBook(this.bookId, book)
        .subscribe(response => this.book = response);
    }
  }

  getBooks(): void {
    this.bookService.getBooks()
      .subscribe(books => this.bookList = books);
  }

  addCategory(id: number): void{
    this.bookService.addCategoryToBook(this.bookId,id)
      .subscribe(response => this.book = response, error => console.log(error.error));
  }

  removeCategory(id: number): void{
    this.bookService.removeCategoryFromBook(this.bookId,id)
      .subscribe(response => this.book = response, error => console.log(error.error));
  }

  delete(book: Book): void {
    this.bookService.deleteBook(book.id).subscribe(() => this.goBack());
  }

  goBack(): void {
    this.router.navigate(['books'])
  }
}
