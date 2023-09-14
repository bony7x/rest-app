import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Book} from "../../model/book.model";

@Component({
  selector: 'app-book-page-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent {

  @Input()
  books: Book[] = [];

  @Output()
  editBook = new EventEmitter<number>();

  sort(sortBy: string): void {
    if (sortBy === 'id') {
      this.books.sort((a, b) => a.id - b.id);
    }
    if (sortBy === 'name') {
      this.books.sort((a, b) => {
        const nameA = a.name.toLowerCase().trim();
        const nameB = b.name.toLowerCase().trim();
        if (nameA < nameB) {
          return -1
        }
        if (nameA > nameB) {
          return 1
        }
        return 0;
      });
    }
    if (sortBy === 'author') {
      this.books.sort((a, b) => {
        const authorA = a.author.toLowerCase().trim();
        const authorB = b.author.toLowerCase().trim();
        if (authorA < authorB) {
          return -1
        }
        if (authorA > authorB) {
          return 1
        }
        return 0;
      });
    }
    if (sortBy === 'count') {
      this.books.sort((a, b) => a.count - b.count);
    }
  }
}
