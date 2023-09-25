import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {BookCategory, BookCategoryCreate} from "../model/bookCategory";
import {ExtendedRequestModel} from "../model/extended-request.model";
import {BookCategoryResponse} from "../responses/BookCategoryResponse";

@Injectable({
  providedIn: 'root'
})
export class BookCategoriesService {

  private booksCategoriesUrl = 'http://localhost:8080/api/bookCategories';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };


  constructor(private http: HttpClient) {
  }

  getBookCategories(extendedRequest: ExtendedRequestModel): Observable<BookCategoryResponse> {
    const url = `${this.booksCategoriesUrl}/all`;
    return this.http.post<BookCategoryResponse>(url,extendedRequest);
  }

  getBookCategoriesGET(): Observable<BookCategory[]>{
    return this.http.get<BookCategory[]>(this.booksCategoriesUrl);
  }

  getBookCategory(id: number): Observable<BookCategory> {
    const url = `${this.booksCategoriesUrl}/${id}`;
    return this.http.get<BookCategory>(url)
  }

  getBookCategoryByName(name: string): Observable<BookCategory> {
    const url = `${this.booksCategoriesUrl}/?name=${name}`;
    return this.http.get<BookCategory>(url)
  }

  deleteBookCategory(id: number): Observable<BookCategory> {
    const url = `${this.booksCategoriesUrl}/${id}`;

    return this.http.delete<BookCategory>(url, this.httpOptions)
  }

  searchBookCategory(name: string): Observable<BookCategory[]> {
    console.log(name);
    const url = `${this.booksCategoriesUrl}/?name=${name}`;
    if (!name.trim()) {
      return of([]);
    }
    return this.http.get<BookCategory[]>(url)
  }

  addBookCategory(category: BookCategoryCreate): Observable<BookCategory>{
    return this.http.post<BookCategory>(this.booksCategoriesUrl,category,this.httpOptions);
  }

  updateBookCategory(id: number,bookCategory: BookCategoryCreate): Observable<any>{
    const url = `${this.booksCategoriesUrl}/${id}`;
    return this.http.put(url, bookCategory, this.httpOptions)
  }
}
