import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Observable} from "rxjs";
import {BookCategory} from "../../../model/bookCategory";
import {BookFormComponent} from "../book-form/book-form.component";
import {BookFilter} from "../../../filters/book-filter";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-book-filter-form',
  templateUrl: './book-filter-form.component.html',
  styleUrls: ['./book-filter-form.component.css']
})
export class BookFilterFormComponent {

  @Input()
  bookCategories?: BookCategory[]

  @Output()
  formSubmit = new EventEmitter<BookFilter>();

  @Output()
  formCancel = new EventEmitter<void>();

  form: FormGroup

  selectedCategory?: BookCategory

  constructor() {
    this.form = new FormGroup({
      name: new FormControl(""),
      author: new FormControl(""),
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
      const name = this.form.controls.name.value;
      const author = this.form.controls.author.value;
      const category = this.form.controls.category.value;
      const filter: BookFilter = new BookFilter(name, author, category);
      this.formSubmit.emit(filter);
    }
  }
}
