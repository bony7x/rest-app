import {ExtendedRequestModel} from "../model/extended-request.model";

export class BookFilter {
  name: string;
  author: string;
  category: string
  request: ExtendedRequestModel


  constructor(name: string, author: string, category: string) {
    this.name = name;
    this.author = author;
    this.category = category;
  }
}
