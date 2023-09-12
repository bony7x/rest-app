import {Borrowing} from "./borrowing.model";

export class Customer {
  id: number
  firstName: string
  lastName: string
  email: string
  borrowings: Borrowing[]

  constructor(id: number, firstName: string, lastName: string, email: string, borrowing: Borrowing[]) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.borrowings = borrowing;
  }
}
  export class CustomerCreate{
    firstName: string
    lastName: string
    email: string


    constructor(firstName: string, lastName: string, email: string) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
    }
  }



