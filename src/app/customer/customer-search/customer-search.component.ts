import {Component, Input, OnInit} from '@angular/core';
import {Customer} from "../../model/customer.model";
import {debounceTime, distinctUntilChanged, Observable, Subject, switchMap} from "rxjs";
import {CustomerService} from "../../customer.service";

@Component({
    selector: 'app-customer-search',
    templateUrl: './customer-search.component.html',
    styleUrls: ['./customer-search.component.css']
})
export class CustomerSearchComponent implements OnInit {

    @Input() customer?: Customer;

    customers$!: Observable<Customer[]>
    private searchFirstName = new Subject<string>()
    private searchLastName = new Subject<string>()

    constructor(private customerService: CustomerService) {
    }

    searchByFirstName(name: string): void {
        this.searchFirstName.next(name);
    }

    ngOnInit(): void {
        this.customers$ = this.searchFirstName.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((name: string) => this.customerService.searchByFirstName(name)),
        );
    }
}
