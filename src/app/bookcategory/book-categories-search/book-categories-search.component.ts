import {Component, Input, OnInit} from '@angular/core';
import {BookCategory} from "../../model/bookCategory";
import {debounceTime, distinctUntilChanged, Observable, Subject, switchMap} from "rxjs";
import {BookCategoriesService} from "../../services/book-categories.service";

@Component({
  selector: 'app-book-page-categories-search',
  templateUrl: './book-categories-search.component.html',
  styleUrls: ['./book-categories-search.component.css']
})
export class BookCategoriesSearchComponent implements OnInit {

  @Input() bookCategory?: BookCategory;

  bookCategories$!: Observable<BookCategory[]>;

  private searchName = new Subject<string>();

  constructor(
    private bookCategoriesService: BookCategoriesService,
  ) {
  }

  search(name: string): void {
    this.searchName.next(name);
  }

  getBookCategory(id: number): void {
    this.bookCategoriesService.getBookCategory(id)
      .subscribe(bookCategory => this.bookCategory = bookCategory);
  }

  ngOnInit(): void {
    this.bookCategories$ = this.searchName.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((name: string) => this.bookCategoriesService.searchBookCategory(name))
    );
  }

  protected readonly Number = Number;
}
