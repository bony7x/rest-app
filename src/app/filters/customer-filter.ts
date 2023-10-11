import {ExtendedRequestModel} from "../model/extended-request.model";

export class CustomerFilter {
  firstName: string;
  lastName: string;
  email: string;
  request: ExtendedRequestModel


  constructor(firstName: string, lastName: string, email: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
}
