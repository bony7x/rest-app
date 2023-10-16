import {Borrowing} from "./borrowing.model";
import {User} from "./user";

export class Customer {
  id: number
  firstName: string
  lastName: string
  email: string
  address: string
  borrowings: Borrowing[]

  constructor(id: number, firstName: string, lastName: string, email: string, borrowing: Borrowing[]) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.borrowings = borrowing;
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
  address: string
  user: User

  constructor(firstName: string, lastName: string, address: string,user?: User) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    if(user){
      this.user = user;
    }
  }
}



