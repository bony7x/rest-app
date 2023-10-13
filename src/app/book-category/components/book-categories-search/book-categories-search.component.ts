import {Component, Input, OnInit} from '@angular/core';
import {BookCategory} from "../../../model/bookCategory";
import {debounceTime, distinctUntilChanged, Observable, of, Subject, switchMap} from "rxjs";
import {BookCategoriesService} from "../../../services/book-categories.service";

@Component({
  selector: 'app-book-page-categories-search',
  templateUrl: './book-categories-search.component.html',
  styleUrls: ['./book-categories-search.component.css']
})
export class BookCategoriesSearchComponent implements OnInit {

  @Input() bookCategory?: BookCategory;

  bookCategories$!: Observable<BookCategory[]>;
  bookCategoriesIds$!: Observable<BookCategory[]>;

  private searchName = new Subject<string>();
  private searchId = new Subject<number>();

  constructor(
    private bookCategoriesService: BookCategoriesService,
  ) {
  }

  search(name: string): void {
    this.searchName.next(name);
  }

  searchById(id: number): void {
    this.searchId.next(id);
  }

  ngOnInit(): void {
    this.bookCategories$ = this.searchName.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((name: string) => this.bookCategoriesService.searchBookCategory(name))
    );
    this.bookCategoriesIds$ = this.searchId.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((id: number) => {
        if (this.bookCategoriesService.getBookCategory(id) === null) {
          return of([]);
        }
        return id !== 0 ? this.bookCategoriesService.getBookCategory(id) : of([]);
      })
    )
  }

  protected readonly Number = Number;
}
