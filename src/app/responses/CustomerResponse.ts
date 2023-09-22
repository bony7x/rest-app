import {Customer} from "../model/customer.model";

export class CustomerResponse {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  customers: Customer[];


  constructor(pageNumber: number, pageSize: number, totalCount: number, customers: Customer[]) {
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
    this.totalCount = totalCount;
    this.customers = customers;
  }
}
