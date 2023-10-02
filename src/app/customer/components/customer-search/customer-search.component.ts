import {Component, Input, OnInit} from '@angular/core';
import {Customer} from "../../../model/customer.model";
import {debounceTime, distinctUntilChanged, Observable, Subject, switchMap} from "rxjs";
import {CustomerService} from "../../../services/customer.service";
import {CustomerPageComponent} from "../../pages/customer-page/customer-page.component";

@Component({
    selector: 'app-customer-page-search',
    templateUrl: './customer-search.component.html',
    styleUrls: ['./customer-search.component.css']
})
export class CustomerSearchComponent implements OnInit {

    @Input() customer?: Customer;

    customerFirstNames$!: Observable<Customer[]>
    customerLastNames$!: Observable<Customer[]>
    customers$!: Observable<Customer[]>
    searchedCustomer: Customer;
    private searchFullName = new Subject<string>()
    private searchFirstName = new Subject<string>()
    private searchLastName = new Subject<string>()

    constructor(private customerService: CustomerService) {
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
        this.customerService.getCustomer(id).subscribe(customer => {
            this.searchedCustomer = customer;
        })
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

    }

    protected readonly Number = Number;
}
