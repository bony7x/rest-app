import {Component, OnInit} from '@angular/core';
import {Customer} from "../../model/customer.model";
import {CustomerService} from "../../customer.service";
import {MessageService} from "../../message.service";
import {last} from "rxjs";

@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

    customers: Customer[] = [];

    constructor(private customerService: CustomerService, private messageService: MessageService) {
    }

    private log(message: string): void {
        this.messageService.add(`CustomerService: ${message}`);
    }

    ngOnInit(): void {
        this.getCustomers();
    }

    getCustomers(): void {
        this.customerService.getCustomers()
            .subscribe(customers => this.customers = customers);
    }

    add(firstName: string, lastName: string, email: string): void {
        if (!firstName || !lastName) {
            this.log('Customers first and last name cannot be empty');
            return;
        }

        this.customerService.addCustomer({firstName, lastName, email} as Customer)
            .subscribe(customer => {
                this.customers.push(customer)
            });
    }
}
