import {Component, Input, OnInit} from '@angular/core';
import {Borrowing} from "../../../model/borrowing.model";
import {debounceTime, distinctUntilChanged, Observable, Subject, switchMap} from "rxjs";
import {BorrowingService} from "../../../services/borrowing.service";

@Component({
  selector: 'app-borrowing-page-search',
  templateUrl: './borrowing-search.component.html',
  styleUrls: ['./borrowing-search.component.css']
})
export class BorrowingSearchComponent implements OnInit {

  @Input() borrowing?: Borrowing;

  borrowingBooks$!: Observable<Borrowing[]>;
  borrowingCustomers$!: Observable<Borrowing[]>;
  searchedBorrowing: Borrowing;
  private searchBookId = new Subject<number>();
  private searchCustomerId = new Subject<number>();

  constructor(private borrowingService: BorrowingService) {
  }

  searchByBookId(id: number): void {
    this.searchBookId.next(id);
  }

  searchByCustomerId(id: number): void {
    this.searchCustomerId.next(id);
  }

  searchById(id: number): void {
    this.borrowingService.getBorrowing(id).subscribe(borrowing => this.searchedBorrowing = borrowing);
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
  }

  protected readonly Number = Number;
}
