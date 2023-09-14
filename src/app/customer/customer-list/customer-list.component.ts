import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Customer} from "../../model/customer.model";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent {

  @Input()
  customers: Customer[] = [];

  @Output()
  editCustomer = new EventEmitter<number>();

  sort(sortBy: string){
    if(sortBy === 'id') {
      this.customers.sort((a,b) => a.id - b.id);
    }
    if(sortBy === 'fname') {
      this.customers.sort((a,b)=> {
        const nameA = a.firstName.toLowerCase().trim();
        const nameB = b.firstName.toLowerCase().trim();
        if(nameA < nameB){
          return -1;
        }
        if(nameA > nameB){
          return 1
        }
        return 0;
      });
    }
    if(sortBy === 'lname') {
      this.customers.sort((a,b)=> {
        const nameA = a.lastName.toLowerCase().trim();
        const nameB = b.lastName.toLowerCase().trim();
        if(nameA < nameB){
          return -1;
        }
        if(nameA > nameB){
          return 1
        }
        return 0;
      });
    }
  if(sortBy === 'email'){
    this.customers.sort((a,b)=> {
      const nameA = a.email.toLowerCase().trim();
      const nameB = b.email.toLowerCase().trim();
      if(nameA < nameB){
        return -1;
      }
      if(nameA > nameB){
        return 1
      }
      return 0;
    });
  }
  }
}
