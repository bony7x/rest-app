import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Borrowing} from "../../../model/borrowing.model";
import {debounceTime, distinctUntilChanged, Observable, Subject, Subscription, switchMap} from "rxjs";
import {BorrowingService} from "../../../services/borrowing.service";

@Component({
  selector: 'app-borrowing-page-search',
  templateUrl: './borrowing-search.component.html',
  styleUrls: ['./borrowing-search.component.css']
})
export class BorrowingSearchComponent implements OnInit, OnDestroy {

  @Input() borrowing?: Borrowing;

  subscriptions: Subscription = new Subscription();
  borrowingBooks$!: Observable<Borrowing[]>;
  borrowingCustomers$!: Observable<Borrowing[]>;
  borrowings$!: Observable<Borrowing[]>;
  private searchBookId = new Subject<number>();
  private searchCustomerId = new Subject<number>();
  private searchBorrowingId = new Subject<number>();

  constructor(private borrowingService: BorrowingService) {
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  searchByBookId(id: number): void {
    if(id)
    this.searchBookId.next(id);
  }

  searchByCustomerId(id: number): void {
    if(id)
    this.searchCustomerId.next(id);
  }

  searchById(id: number): void {
    if (id) {
     this.searchBorrowingId.next(id);
    }
  }

  ngOnInit(): void {
    this.borrowingBooks$ = this.searchBookId.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((id: number) => this.borrowingService.searchByBookId(id)),
    );

    this.borrowingCustomers$ = this.searchCustomerId.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((id: number) => this.borrowingService.searchByCustomerId(id)),
    );

    this.borrowings$ = this.searchBorrowingId.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((id:number) => this.borrowingService.searchByBorrowingId(id)),
    );
  }

  protected readonly Number = Number;
}
