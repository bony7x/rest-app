import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Book, BookCreate} from "../../model/book.model";
import {ActivatedRoute, Router} from "@angular/router";
import {BooksService} from "../../services/books.service";
import {BookCategoriesService} from "../../services/book-categories.service";
import {BookCategory} from "../../model/bookCategory";
import {Subscription} from "rxjs";
import {ToastService} from "angular-toastify";

@Component({
  selector: 'app-book-page-detail-page',
  templateUrl: './book-detail-page.component.html',
  styleUrls: ['./book-detail-page.component.css']
})
export class BookDetailPageComponent implements OnInit, OnDestroy {

  @Input()
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
      .subscribe(book =>{
        this.book = book;
        this.toastService.success('Loaded book with ID: ' +  this.bookId);
      })
    );
  }

  getBookCategories(): void {
    this.subscriptions.add(
    this.bookCategoriesService.getBookCategories()
      .subscribe(categories => {
        this.bookCategoryList = categories;
      this.toastService.success('Loaded categories of book with ID: ' + this.bookId)})
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

  addCategory(id: number): void{
    this.subscriptions.add(
    this.bookService.addCategoryToBook(this.bookId,id)
      .subscribe(response => {
        this.book = response;
        this.toastService.success('Category was successfully added to the book!')
      }));
  }

  removeCategory(id: number): void{
    this.subscriptions.add(
    this.bookService.removeCategoryFromBook(this.bookId,id)
      .subscribe(response => {
        this.book = response;
        this.toastService.success('Category was successfully removed from the book')
      }));
  }

  delete(book: Book): void {
    this.subscriptions.add(
    this.bookService.deleteBook(book.id).subscribe(() => {
      this.toastService.success('Book was successfully removed')
      this.goBack();
    }))
  }

  goBack(): void {
    this.router.navigate(['books'])
  }
}
