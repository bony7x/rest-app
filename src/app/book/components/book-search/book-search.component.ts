import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {debounceTime, distinctUntilChanged, Observable, of, Subject, Subscription, switchMap} from "rxjs";
import {Book} from "../../../model/book.model";
import {BooksService} from "../../../services/books.service";

@Component({
  selector: 'app-book-page-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent implements OnInit, OnDestroy {

  @Input() book?: Book;

  subscriptions: Subscription = new Subscription();
  books$!: Observable<Book[]>;
  booksId$!: Observable<Book[]>;

  private searchName = new Subject<string>();
  private searchId = new Subject<number>();

  constructor(
    private booksService: BooksService) {
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  search(name: string): void {
    this.searchName.next(name);
  }

  searchById(id: number): void {

    this.searchId.next(id);
  }

  ngOnInit() {
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

  protected readonly Number = Number;
}
