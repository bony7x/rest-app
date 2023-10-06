import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {BookCategory} from "../../../model/bookCategory";
import {debounceTime, distinctUntilChanged, Observable, of, Subject, Subscription, switchMap} from "rxjs";
import {BookCategoriesService} from "../../../services/book-categories.service";

@Component({
    selector: 'app-book-page-categories-search',
    templateUrl: './book-categories-search.component.html',
    styleUrls: ['./book-categories-search.component.css']
})
export class BookCategoriesSearchComponent implements OnInit, OnDestroy {

    @Input() bookCategory?: BookCategory;

    subscriptions: Subscription = new Subscription();
    bookCategories$!: Observable<BookCategory[]>;
    bookCategoriesIds$!: Observable<BookCategory[]>;

    private searchName = new Subject<string>();
    private searchId = new Subject<number>();

    constructor(
        private bookCategoriesService: BookCategoriesService,
    ) {
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

    getBookCategory(id: number): void {
        if (id) {
            this.subscriptions.add(
                this.bookCategoriesService.getBookCategory(id)
                    .subscribe(bookCategory => this.bookCategory = bookCategory[0]));
        }
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
          switchMap((id:number)=> {
            if(this.bookCategoriesService.getBookCategory(id) === null){
              return of([]);
            }
            return id !== 0 ? this.bookCategoriesService.getBookCategory(id) : of([]);
          })
        )
    }

    protected readonly Number = Number;
}
