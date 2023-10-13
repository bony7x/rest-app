import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BookCategory} from "../../../model/bookCategory";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-book-categories-filter-form',
  templateUrl: './book-categories-filter-form.component.html',
  styleUrls: ['./book-categories-filter-form.component.css']
})
export class BookCategoriesFilterFormComponent {
  @Input()
  bookCategories?: BookCategory[]

  @Output()
  formSubmit = new EventEmitter<Map<string, string>>();

  @Output()
  formCancel = new EventEmitter<void>();

  form: FormGroup

  selectedCategory?: BookCategory

  constructor() {
    this.form = new FormGroup({
      category: new FormControl("")
    })
  }

  changeSelectedCategory(categoryId: string): void {
    if (categoryId !== undefined) {
      this.selectedCategory = this.bookCategories?.find(category => category.id === Number(categoryId))
    }
  }

  onFormSubmit(): void {
    if (this.form.valid) {
      const category = this.form.controls.category.value;
      let map = new Map<string, string>()
        .set('category', category);
      this.formSubmit.emit(map);
    }
  }
}
