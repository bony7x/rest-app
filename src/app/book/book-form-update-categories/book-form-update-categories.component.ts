import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {BookCategory} from "../../model/bookCategory";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Book} from "../../model/book.model";

@Component({
  selector: 'app-book-form-add-category',
  templateUrl: './book-form-update-categories.component.html',
  styleUrls: ['./book-form-update-categories.component.css']
})
export class BookFormUpdateCategoriesComponent implements OnChanges{

  @Input()
  bookCategories?: BookCategory[] = [];

  @Input()
  selectedBook: Book;

  @Output()
  formSubmit = new EventEmitter<number[]>();

  @Output()
  formCancel = new EventEmitter<void>();

  form: FormGroup

  selectedBookCategory?: BookCategory

  constructor() {
    this.form = new FormGroup({
      categories: new FormArray([], Validators.required)
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ON CHANGES:', changes);
    if (changes.bookCategories?.currentValue) {
      this.addFormControls();
    }

    if (this.selectedBook && this.form.controls.categories.value?.length) {
      this.fillCategories();
    }
  }

  onFormSubmit(): void {
    const categories = this.mapCategories();
    if (this.form.valid) {
      console.log('FORM-ADD-CATEGORY:' + this.selectedBookCategory?.id)
      this.formSubmit.emit(categories);
    }
  }

  private addFormControls(): void {
    this.bookCategories?.forEach(category => {
      this.categoriesAsArray().push(new FormControl(false));
    })
  }

  private fillCategories(): void {
    this.selectedBook?.categories?.forEach(bookCategory => {
      const index = this.bookCategories?.findIndex(category => category.id === bookCategory.id);
      if (index !== undefined && index !== -1) {
        this.categoriesAsArray().controls[index].setValue(true);
      }
    })
  }

  private mapCategories(): number[] {
    const categories: number[] = [];
    this.form.controls.categories.value.forEach((hasCategory: boolean, index: number) => {
      if (hasCategory) {
        if (this.bookCategories) {
          categories.push(this.bookCategories[index]?.id);
        }
      }
    })
    return categories;
  }

  private categoriesAsArray(): FormArray {
    return this.form.controls.categories as FormArray;
  }
}
