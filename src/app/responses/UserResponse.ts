import {User} from "../model/user";

export class UserResponse{
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  users: User[]


  constructor(pageNumber: number, pageSize: number, totalCount: number, users: User[]) {
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
    this.totalCount = totalCount;
    this.users = users;
  }
}
