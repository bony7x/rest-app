import {Component, Input, OnInit} from '@angular/core';
import {debounceTime, distinctUntilChanged, Observable, Subject, switchMap} from "rxjs";
import {Book} from "../../../model/book.model";
import {BooksService} from "../../../services/books.service";

@Component({
  selector: 'app-book-page-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent implements OnInit {

  @Input() book?: Book;

  books$!: Observable<Book[]>;
  private searchName = new Subject<string>();

  constructor(
    private booksService: BooksService) {
  }

  search(name: string): void {
    this.searchName.next(name);
  }

  getBook(id: number): void {
    if(id !== 0)
    this.booksService.getBook(id)
      .subscribe(book => this.book = book);
  }

  ngOnInit() {
    this.books$ = this.searchName.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((name: string) => this.booksService.searchBook(name)),
    );
  }

  protected readonly Number = Number;
}
