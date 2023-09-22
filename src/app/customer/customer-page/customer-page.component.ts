import {Component, EventEmitter, OnDestroy, OnInit, Output, TemplateRef} from '@angular/core';
import {Customer, CustomerCreate} from "../../model/customer.model";
import {CustomerService} from "../../services/customer.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastService} from "angular-toastify";
import {Sortable} from "../../model/sortable";
import {Extendedrequest} from "../../model/extendedrequest";
import {Pageable} from "../../model/pageable";
import {CustomerResponse} from "../../responses/CustomerResponse";

@Component({
  selector: 'app-customer-page',
  templateUrl: './customer-page.component.html',
  styleUrls: ['./customer-page.component.css']
})
export class CustomerPageComponent implements OnInit, OnDestroy {

  customerResponse: CustomerResponse;

  subscriptions: Subscription = new Subscription();
  pageNumber: number = 1;
  pageSize: number = 5;
  sortable: Sortable = new Sortable('id',true);
  pageable: Pageable = new Pageable(this.pageNumber,this.pageSize)
  extendedRequest: Extendedrequest = new Extendedrequest(this.sortable,this.pageable);

  @Output()
  paginationChange = new EventEmitter<number>();

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private modalService: NgbModal,
    private toastService: ToastService
  ) {
  }

  ngOnInit(): void {
    this.getCustomers(this.pageNumber);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getCustomers(pageNumber: number): void {
    this.extendedRequest.pageable.pageNumber = pageNumber;
    this.subscriptions.add(
      this.customerService.getCustomers(this.extendedRequest)
      .subscribe(response => {
        this.customerResponse = response;
        this.toastService.success('Loaded customers!')
      }));
  }

  onPageChange(pageNumber: number):void{
    this.getCustomers(pageNumber)
  }

  openModal(addCustomerModal: TemplateRef<any>): void {
    this.modalService.open(addCustomerModal);
  }

  add(customer: CustomerCreate): void {
    this.subscriptions.add(
      this.customerService.addCustomer(customer)
      .subscribe(customer => {
        this.getCustomers(this.pageNumber);
        this.toastService.success('Successfully added new customer!');
      }));
  }

  goBack(): void {
    this.router.navigate(['dashboard'])
  }

  editCustomer(id: number): void {
    this.router.navigate(['customers', 'detail', id]);
  }
}
