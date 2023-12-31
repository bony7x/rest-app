import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Book, BookCreate} from "../../../model/book.model";
import {BookCategory} from "../../../model/bookCategory";

@Component({
  selector: 'app-book-page-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent {

  @Output()
  formSubmit = new EventEmitter<BookCreate>();

  @Output()
  formCancel = new EventEmitter<void>();

  form: FormGroup

  constructor() {
    this.form = new FormGroup({
      id: new FormControl(undefined),
      name: new FormControl(null, Validators.required),
      count: new FormControl(undefined, Validators.required),
      author: new FormControl(null, Validators.required),
    })
  }


  @Input()
  set bookData(book: Book | undefined) {
    if (book) {
      this.form.controls['id'].setValue(book.id);
    }
  }

  onFormSubmit(): void {
    if (this.form.valid) {
      const name = this.form.controls.name.value;
      const author = this.form.controls.author.value;
      const count = this.form.controls.count.value;
      const bookCreate: BookCreate = new BookCreate(name, author, count);
      this.formSubmit.emit(bookCreate);
    }
  }
}
