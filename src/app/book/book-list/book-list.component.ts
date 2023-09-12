import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Book} from "../../model/book.model";

@Component({
  selector: 'app-book-page-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent {

  @Input()
  books: Book[]=[];

  @Output()
  editBook = new EventEmitter<number>();


}
