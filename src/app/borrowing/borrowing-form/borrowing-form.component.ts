import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Borrowing, BorrowingCreate} from "../../model/borrowing.model";
import {Book} from "../../model/book.model";
import {Customer} from "../../model/customer.model";

@Component({
  selector: 'app-borrowing-page-form',
  templateUrl: './borrowing-form.component.html',
  styleUrls: ['./borrowing-form.component.css']
})
export class BorrowingFormComponent {


  @Input()
  books?: Book[];

  @Input()
  customers?: Customer[];

  @Input()
  set borrowingData(borrowing: Borrowing | undefined) {
    if (borrowing) {
      this.form.controls['id'].setValue(borrowing.id);
      this.form.controls['book'].setValue(borrowing.book.id);
      this.selectedBook = borrowing.book;
      this.selectedCustomer = borrowing.customer;
      this.form.controls['customer'].setValue(borrowing.customer.id);
    }
  }

  @Output()
  formSubmit = new EventEmitter<BorrowingCreate>();

  @Output()
  formCancel = new EventEmitter<void>();

  form: FormGroup;

  selectedBook?: Book;
  selectedCustomer?: Customer;

  constructor() {
    this.form = new FormGroup({
      id: new FormControl(undefined),
      book: new FormControl(null, Validators.required),
      customer: new FormControl(null, Validators.required)
    })
  }

  changeSelectedBook(bookId: string): void {
    if (bookId !== undefined) {
      this.selectedBook = this.books?.find(book => book.id === Number(bookId));
    }
  }

  changeSelectedCustomer(customerId: string): void {
    if (customerId !== undefined) {
      this.selectedCustomer = this.customers?.find(customer => customer.id === Number(customerId));
    }
  }

  onFormSubmit(): void {
    if (this.form.valid) {
      const bookId = this.form.controls.book.value;
      const customerId = this.form.controls.customer.value;
      const borrowingCreate: BorrowingCreate = new BorrowingCreate(bookId, customerId);
      this.formSubmit.emit(borrowingCreate);
    }
  }
}
