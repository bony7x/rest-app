import {Component, OnInit} from '@angular/core';
import {Book, BookCreate} from "../../model/book.model";
import {BooksService} from "../../services/books.service";
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-book',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css']
})
export class BookPageComponent implements OnInit{

  books: Book[] = [];
  book: Book;

  constructor(private bookService: BooksService, private messageService: MessageService) {
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

  protected readonly Number = Number;
}
