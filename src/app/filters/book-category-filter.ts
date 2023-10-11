import {ExtendedRequestModel} from "../model/extended-request.model";

export class BookCategoryFilter {
  category: string
  request: ExtendedRequestModel


  constructor(category: string) {
    this.category = category;
  }
}
