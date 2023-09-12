import {Component, OnInit, TemplateRef} from '@angular/core';
import {Book, BookCreate} from "../../model/book.model";
import {BooksService} from "../../services/books.service";
import {MessageService} from "../../services/message.service";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Location} from "@angular/common";

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css']
})
export class BookPageComponent implements OnInit{

  books: Book[] = [];
  book: Book;

  constructor(
    private bookService: BooksService,
    private messageService: MessageService,
    private router: Router,
    private modalService: NgbModal,
    private location: Location) {
  }

  private log(message: string) {
    this.messageService.add(`BooksService: ${message}`);
  }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getBooks()
      .subscribe(books => this.books = books);
  }

  openModal(addBookModal: TemplateRef<any>): void {
    this.modalService.open(addBookModal);
  }

  add(book:BookCreate): void {
   /* console.log(name);
    name = name.trim();
    if (!name || !author) {
      this.log('Book name and author cannot be empty!');
      return;
    }*/
    this.bookService.addBook(book)
      .subscribe(book1 => {
        this.books.push(book1)
      });
  }

  goBack(): void {
    this.location.back();
  }

  editBook(id: number): void {
    this.router.navigate(['books', 'detail', id]);
  }
  protected readonly Number = Number;
  protected readonly opener = opener;
  protected readonly close = close;
}
