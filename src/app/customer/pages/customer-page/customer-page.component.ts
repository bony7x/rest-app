import {Component, EventEmitter, OnDestroy, OnInit, Output, TemplateRef} from '@angular/core';
import {Customer, CustomerCreate} from "../../../model/customer.model";
import {CustomerService} from "../../../services/customer.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastService} from "angular-toastify";
import {ExtendedRequestModel, Pageable, Sortable} from "../../../model/extended-request.model";
import {CustomerResponse} from "../../../responses/CustomerResponse";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'app-customer-page',
  templateUrl: './customer-page.component.html',
  styleUrls: ['./customer-page.component.css']
})
export class CustomerPageComponent implements OnInit, OnDestroy {

  customerResponse: CustomerResponse;

  subscriptions: Subscription = new Subscription();
  pageNumber: number
  pageSize: number
  totalCount: number;
  sortable: Sortable = new Sortable('id', true);
  pageable: Pageable
  extendedRequest: ExtendedRequestModel
  isAdmin: boolean

  @Output()
  paginationChange = new EventEmitter<number>();

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private modalService: NgbModal,
    private toastService: ToastService,
    private authService: AuthenticationService
  ) {
  }

  ngOnInit(): void {
    this.getCustomers(this.pageNumber);
    this.isAdminFn();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getCustomers(pageNumber: number): void {
    if (this.pageNumber === undefined || this.pageSize === undefined || Number.isNaN(pageNumber)) {
      this.pageable = new Pageable(1, 5)
    } else {
      this.pageable = new Pageable(pageNumber, this.pageSize)
    }
    this.sortable = new Sortable('id', true);
    this.extendedRequest = new ExtendedRequestModel(this.sortable, this.pageable)
    this.subscriptions.add(
      this.customerService.getCustomers(this.extendedRequest)
      .subscribe(response => {
        this.customerResponse = response;
        this.pageSize = response.pageSize;
        this.pageNumber = response.pageNumber;
        this.totalCount = response.totalCount;
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
    this.router.navigate(['customers', 'edit', id]);
  }

  showCustomerDetail(id: number){
    this.router.navigate(['customers', 'detail', id]);
  }

  isAdminFn(){
    if(this.authService.getUserRole() === 'USER'){
      this.isAdmin = false;
    }
    if(this.authService.getUserRole() === 'ADMINISTRATOR'){
      this.isAdmin = true;
    }
  }
}
