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

export class UserUpdateUsername {
  name: string;
  password: string;
  token: string | null;


  constructor(name: string, password: string) {
    this.name = name;
    this.password = password;
  }
}

export class UserUpdateEmail {
  email: string
  password: string;
  token: string | null;


  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

export class UserUpdateAddress {
  address: string
  password: string;
  token: string | null;


  constructor(address: string, password: string) {
    this.address = address;
    this.password = password;
  }
}
