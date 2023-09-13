import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BookCategory} from "../../model/bookCategory";
import {Book} from "../../model/book.model";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-book-form-remove-category',
  templateUrl: './book-form-remove-category.component.html',
  styleUrls: ['./book-form-remove-category.component.css']
})
export class BookFormRemoveCategoryComponent {

  @Input()
  bookCategories?: BookCategory[] = [];

  @Output()
  formSubmit = new EventEmitter<any>();

  @Output()
  formCancel = new EventEmitter<void>();

  form:FormGroup;

  selectedBookCategory?: BookCategory;

  constructor() {
    this.form = new FormGroup({
      categories: new FormControl()
    })
  }

  changeSelectedBookCategory(categoryId: string): void {
    if (categoryId !== undefined) {
      this.selectedBookCategory = this.bookCategories?.find(category => category.id === Number(categoryId));
    }
  }

  onFormSubmit(): void {
    if (this.form.valid) {
      this.formSubmit.emit(this.selectedBookCategory?.id);
    }
  }
}
