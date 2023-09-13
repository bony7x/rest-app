import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {Book, BookCreate} from "../../model/book.model";
import {BooksService} from "../../services/books.service";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Location} from "@angular/common";
import {Subscription} from "rxjs";
import {ToastService} from "angular-toastify";

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css']
})
export class BookPageComponent implements OnInit , OnDestroy{

  books: Book[] = [];
  book: Book;

  subscriptions: Subscription = new Subscription();

  constructor(
    private bookService: BooksService,
    private router: Router,
    private modalService: NgbModal,
    private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.getBooks();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  getBooks(): void {
    this.subscriptions.add(
    this.bookService.getBooks()
      .subscribe(books =>{
        this.books = books;
        this.toastService.success('Loaded all books!')
      }));
  }

  openModal(addBookModal: TemplateRef<any>): void {
    this.modalService.open(addBookModal);
  }

  add(book: BookCreate): void {
    this.bookService.addBook(book)
      .subscribe(() => {
        this.getBooks();
        this.toastService.success('Successfully added new book!')
      });
  }

  goBack(): void {
    this.router.navigate(['dashboard'])
  }

  editBook(id: number): void {
    this.router.navigate(['books', 'detail', id]);
  }
}
