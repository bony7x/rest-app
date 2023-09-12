import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {Book, BookCreate} from "../../model/book.model";
import {BooksService} from "../../services/books.service";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Location} from "@angular/common";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css']
})
export class BookPageComponent implements OnInit , OnDestroy{

  books: Book[] = [];
  book: Book;

  private bookSubscriber: Subscription;

  constructor(
    private bookService: BooksService,
    private router: Router,
    private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.getBooks();
  }

  ngOnDestroy() {
    if(this.bookSubscriber){
      this.bookSubscriber.unsubscribe();
    }
  }

  getBooks(): void {
    this.bookService.getBooks()
      .subscribe(books => this.books = books);
  }

  openModal(addBookModal: TemplateRef<any>): void {
    this.modalService.open(addBookModal);
  }

  add(book: BookCreate): void {
    this.bookService.addBook(book)
      .subscribe(book1 => {
        this.books.push(book1)
      });
  }

  goBack(): void {
    this.router.navigate(['dashboard'])
  }

  editBook(id: number): void {
    this.router.navigate(['books', 'detail', id]);
  }
}
