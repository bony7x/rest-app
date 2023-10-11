import {ExtendedRequestModel} from "../model/extended-request.model";

export class BorrowingFilter{

  name: string;
  email:string;
  date: Date;
  request: ExtendedRequestModel;


  constructor(name: string, email: string, date: Date) {
    this.name = name;
    this.email = email;
    this.date = date;
  }
}
