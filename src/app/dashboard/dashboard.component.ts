import {Component, OnInit} from '@angular/core';
import {BooksService} from "../services/books.service";
import {Book} from "../model/book.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  books: Book[] = [];

  constructor(private booksService: BooksService) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.booksService.getBooks()
      .subscribe(books => {this.books = books; console.log('BOOKS:', this.books)});
  }
}
