import {Component, OnInit} from '@angular/core';
import {debounceTime, distinctUntilChanged, Observable, of, Subject, switchMap} from "rxjs";
import {Book} from "../../../model/book.model";
import {BooksService} from "../../../services/books.service";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'app-book-page-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent implements OnInit {

  books$!: Observable<Book[]>;
  booksId$!: Observable<Book[]>;
  routerLink: string;

  private searchName = new Subject<string>();
  private searchId = new Subject<number>();

  constructor(
    private booksService: BooksService,
    private authService: AuthenticationService) {
  }

  search(name: string): void {
    this.searchName.next(name);
  }

  searchById(id: number): void {
    this.searchId.next(id);
  }

  ngOnInit() {
    this.setRouterLink();
    console.log(this.routerLink)
    this.books$ = this.searchName.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((name: string) => this.booksService.searchBook(name)),
    );

    this.booksId$ = this.searchId.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((id: number) => {
        if (this.booksService.getBook(id) === null) {
          return of([]);
        }
        return id !== 0 ? this.booksService.getBook(id) : of([]);
      })
    )
  }

  setRouterLink():void {
    if(this.isUser() || this.isCustomer()){
      this.routerLink = '/books/detail/'
    } else {
      this.routerLink = '/books/edit/'
    }
  }

  isUser(): boolean{
    return this.authService.isUser();
  }

  isCustomer(): boolean{
    return this.authService.isCustomer();
  }

  isAdmin(): boolean{
    return this.authService.isAdmin();
  }

  protected readonly Number = Number;
}
