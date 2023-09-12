import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent {

  @Output()
  customerToUpdate = new EventEmitter<number>();

  @Output()
  customerToDelete = new EventEmitter<number>();

  updateCustomer(id: number): void {
    this.customerToUpdate.emit(id);
  }

  deletePerson(id: number): void {
    this.customerToDelete.emit(id);
  }

  filterForm = new FormGroup({
    lastName: new FormControl()
  });
}
