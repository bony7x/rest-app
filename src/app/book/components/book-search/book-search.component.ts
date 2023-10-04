import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {debounceTime, distinctUntilChanged, Observable, Subject, Subscription, switchMap} from "rxjs";
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

    private searchName = new Subject<string>();

    constructor(
        private booksService: BooksService) {
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    search(name: string): void {
        this.searchName.next(name);
    }

    getBook(id: number): void {
        if (id) {
            this.subscriptions.add(
                this.booksService.getBook(id)
                    .subscribe(book => this.book = book));
        }
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
