import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Customer} from "../../../model/customer.model";
import {debounceTime, distinctUntilChanged, Observable, of, Subject, Subscription, switchMap} from "rxjs";
import {CustomerService} from "../../../services/customer.service";

@Component({
  selector: 'app-customer-page-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.css']
})
export class CustomerSearchComponent implements OnInit, OnDestroy {

  @Input() customer?: Customer;

  subscriptions: Subscription = new Subscription();
  customerFirstNames$!: Observable<Customer[]>
  customerLastNames$!: Observable<Customer[]>
  customers$!: Observable<Customer[]>
  customerIds$!: Observable<Customer[]>;
  private searchFullName = new Subject<string>()
  private searchFirstName = new Subject<string>()
  private searchLastName = new Subject<string>()
  private searchId = new Subject<number>();

  constructor(private customerService: CustomerService) {
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  searchByFirstName(name: string): void {
    this.searchFirstName.next(name);
  }

  searchByLastName(name: string): void {
    this.searchLastName.next(name);
  }

  searchByFullName(name: string): void {
    this.searchFullName.next(name);
  }

  searchById(id: number): void {
    this.searchId.next(id);
  }

  ngOnInit(): void {
    this.customerFirstNames$ = this.searchFirstName.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((name: string) => this.customerService.searchByFirstName(name)),
    );

    this.customerLastNames$ = this.searchLastName.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((name: string) => this.customerService.searchByLastName(name)),
    );

    this.customers$ = this.searchFullName.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((name: string) => this.customerService.searchByFullName(name))
    );
    this.customerIds$ = this.searchId.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((id: number) => {
        if (this.customerService.getCustomer(id) === null) {
          return of([]);
        }
        return id !== 0 ? this.customerService.getCustomer(id) : of([])
      })
    )
  }

  protected readonly Number = Number;
}
