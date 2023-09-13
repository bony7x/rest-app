import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BookCategory} from "../../model/bookCategory";
import {Book} from "../../model/book.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-book-form-add-category',
  templateUrl: './book-form-add-category.component.html',
  styleUrls: ['./book-form-add-category.component.css']
})
export class BookFormAddCategoryComponent {

  @Input()
  bookCategories?: BookCategory[] = [];

  @Output()
  formSubmit = new EventEmitter<any>();

  @Output()
  formCancel = new EventEmitter<void>();

  form: FormGroup

  selectedBookCategory?: BookCategory

  constructor() {
    this.form = new FormGroup({
      categories: new FormControl(null, Validators.required),
    })
  }

  changeSelectedBookCategory(categoryId: string): void {
    if (categoryId !== undefined) {
      this.selectedBookCategory = this.bookCategories?.find(category => category.id === Number(categoryId));
    }
  }

  onFormSubmit(): void {
    if (this.form.valid) {
      console.log('FORM-ADD-CATEGORY:' + this.selectedBookCategory?.id)
      this.formSubmit.emit(this.selectedBookCategory?.id);
    }
  }

}
