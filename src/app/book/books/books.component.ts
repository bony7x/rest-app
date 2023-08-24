import {Component, OnInit} from '@angular/core';
import {Book} from "../../model/book.model";
import {BooksService} from "../../books.service";
import {MessageService} from "../../message.service";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit{

  books: Book[] = [];

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

  add(name: string, author: string, count: number): void {
    console.log(name);
    name = name.trim();
    if (!name || !author) {
      this.log('Book name and author cannot be empty!');
      return;
    }
    this.bookService.addBook({name, author, count} as Book)
      .subscribe(book => {
        this.books.push(book)
      });
  }

  protected readonly Number = Number;
}
