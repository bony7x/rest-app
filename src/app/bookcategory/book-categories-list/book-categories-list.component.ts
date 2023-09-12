import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BookCategory} from "../../model/bookCategory";

@Component({
  selector: 'app-book-categories-list',
  templateUrl: './book-categories-list.component.html',
  styleUrls: ['./book-categories-list.component.css']
})
export class BookCategoriesListComponent {

  @Input()
  categories: BookCategory[] = [];

  @Output()
  editCategory = new EventEmitter<number>();
}
