import {Customer} from "./customer.model";

export enum UserRole {
  USER = 'User',
  ADMINISTRATOR = 'Administrator',
  CUSTOMER = 'Customer'
}

export class User {
  id: number;
  name: string;
  password: string;
  email: string;
  customer: Customer
  role: UserRole


  constructor(name: string, password: string, email?: string) {
    this.name = name;
    this.password = password;
    if (email) {
      this.email = email;
    }
  }
}


export class UserUpdate {
  id: number;
  role: string;


  constructor(id: number, role: string) {
    this.id = id;
    this.role = role;
  }
}

export class UserUpdateNameEmail {
  name: string;
  email: string


  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}
