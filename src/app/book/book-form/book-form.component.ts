import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Book, BookCreate} from "../../model/book.model";
import {BookCategory} from "../../model/bookCategory";
import {BookCategoriesService} from "../../services/book-categories.service";
import {BooksService} from "../../services/books.service";

@Component({
  selector: 'app-book-page-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent {

  @Input()
  bookCategories?: BookCategory[]=[];

  @Input()
  currentBookCategories?: BookCategory[]=[];

  @Input()
  set bookData(book: Book | undefined){
    if(book){
      this.form.controls.id.setValue(book.id);
      this.form.controls.name.setValue(book.name);
      this.form.controls.author.setValue(book.author);
      this.form.controls.count.setValue(book.count);
      this.form.controls.categories.setValue(book.categories);

      // this.form.patchValue(book);

    }
  }

  @Output()
  formSubmit = new EventEmitter<BookCreate>();

  @Output()
  formCancel = new EventEmitter<void>();

  form: FormGroup

  selectedBookCategory?: BookCategory;

  ngOnInit(){
    this.getCurrentBookCategories();
  }

  constructor(
    private bookService: BooksService
  ) {
    this.form = new FormGroup({
        id: new FormControl(null),
        name: new FormControl(null, Validators.required),
        count: new FormControl(undefined, Validators.required),
        author: new FormControl(null, Validators.required),
        categories: new FormControl(null),
      })
  }

  onFormSubmit(): void {
    if (this.form.valid) {
      const name = this.form.controls.name.value;
      const author = this.form.controls.author.value;
      const count = this.form.controls.count.value;
      const bookCreate: BookCreate = new BookCreate(name, author, count);
      // const bookCreate: BookCreate = new BookCreate(this.form.value);
      this.formSubmit.emit(bookCreate);
    }
  }

  getCurrentBookCategories(){
/*    if (this.form.valid){

/!*      for (let value of this.form.controls.categories){
        console.log(value)*!/
        // @ts-ignore
        this.currentBookCategories.push(value);
      }
      // @ts-ignore
      this.currentBookCategories.push(this.form.controls.categories)*/
    }


  addCategoryToBook(id: number | undefined): void {
    console.log('SELECTED BOOK CATEGORY:', this.selectedBookCategory)
    if (this.form.valid && id !== undefined) {
      this.bookService.addCategoryToBook(this.form.controls.id.value, id)
        .subscribe();
    }
  }

  removeCategoryFromBook(id: number | undefined) {
    if (this.form.valid && id !== undefined) {
      this.bookService.removeCategoryFromBook(this.form.controls.id.value, id)
        .subscribe();
    }
  }

  changeSelectedBookCategory(bookCategoryId: String): void {
    console.log('BOOK CATEGORY ID:', bookCategoryId)
    if (bookCategoryId !== undefined){
      this.selectedBookCategory = this.bookCategories?.find(bookCategory => bookCategory.id === Number(bookCategoryId));
    }
  }
}
