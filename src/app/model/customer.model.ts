import {Borrowing} from "./borrowing.model";
import {User} from "./user";

export class Customer {
  id: number
  firstName: string
  lastName: string
  email: string
  address: string
  borrowings: Borrowing[]
  borrowingCount: number;

  constructor(id: number, firstName: string, lastName: string, email: string, borrowing: Borrowing[], borrowingCount: number) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.borrowings = borrowing;
    this.borrowingCount = borrowingCount;
  }
}

export class CustomerCreate {
  firstName: string
  lastName: string
  email: string


  constructor(firstName: string, lastName: string, email: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
}

export class RegisterCustomer {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  user: User

  constructor(firstName: string, lastName: string, address: string, email: string, user?: User) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.email = email;
    if (user) {
      this.user = user;
    }
  }
}



