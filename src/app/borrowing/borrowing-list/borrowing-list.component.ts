import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Borrowing} from "../../model/borrowing.model";

@Component({
  selector: 'app-borrowing-page-list',
  templateUrl: './borrowing-list.component.html',
  styleUrls: ['./borrowing-list.component.css']
})
export class BorrowingListComponent {

  @Input()
  borrowings: Borrowing[] = [];

  @Output()
  editBorrowing = new EventEmitter<number>();

  sort(sortBy: string){
    if(sortBy === 'id') {
      this.borrowings.sort((a,b)=> a.id - b.id);
    }
    if(sortBy === 'bookid') {
      this.borrowings.sort((a,b) => a.book.id - b.book.id);
    }
    if(sortBy === 'bookname') {
    this.borrowings.sort((a,b)=> {
      const nameA = a.book.name.toLowerCase().trim();
      const nameB = b.book.name.toLowerCase().trim();
      if(nameA < nameB){
        return -1;
      }
      if(nameA > nameB){
        return 1
      }
      return 0;
    });
    }
    if(sortBy === 'customerid') {
      this.borrowings.sort((a,b) => a.customer.id - b.customer.id);
    }
    if(sortBy === 'customerfname') {
      this.borrowings.sort((a,b)=> {
        const nameA = a.customer.firstName.toLowerCase().trim();
        const nameB = b.customer.firstName.toLowerCase().trim();
        if(nameA < nameB){
          return -1;
        }
        if(nameA > nameB){
          return 1
        }
        return 0;
      });
    }
    if(sortBy === 'customerlname') {
      this.borrowings.sort((a,b)=> {
        const nameA = a.customer.lastName.toLowerCase().trim();
        const nameB = b.customer.lastName.toLowerCase().trim();
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
