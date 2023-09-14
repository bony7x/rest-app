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

  sort(sortBy: string){
    if (sortBy === 'id') {
      this.categories.sort((a, b) => a.id - b.id);
    }
    if (sortBy === 'name') {
      this.categories.sort((a, b) => {
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
  }
}
