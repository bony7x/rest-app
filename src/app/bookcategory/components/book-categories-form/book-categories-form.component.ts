import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BookCategory, BookCategoryCreate} from "../../../model/bookCategory";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-book-categories-form',
  templateUrl: './book-categories-form.component.html',
  styleUrls: ['./book-categories-form.component.css']
})
export class BookCategoriesFormComponent {

  @Output()
  formSubmit = new EventEmitter<BookCategoryCreate>()

  @Output()
  formCancel = new EventEmitter<void>();

  form: FormGroup;

  @Input()
  set categoryData(category: BookCategory | undefined) {
    if (category) {
      this.form.controls.id.setValue(category.id)
      this.form.controls.name.setValue(category.name)
    }
  }

  constructor() {
    this.form = new FormGroup({
      id: new FormControl(undefined),
      name: new FormControl,
    })
  }

  onFormSubmit(): void {
    if (this.form.valid) {
      const name = this.form.controls.name.value;
      const categoryCreate: BookCategoryCreate = new BookCategoryCreate(name)
      this.formSubmit.emit(categoryCreate)
    }
  }
}
