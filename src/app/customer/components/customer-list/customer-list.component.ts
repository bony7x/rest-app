import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ExtendedRequestModel, Pageable, Sortable} from "../../../model/extended-request.model";
import {CustomerService} from "../../../services/customer.service";
import {CustomerResponse} from "../../../responses/CustomerResponse";
import {Subscription} from "rxjs";
import {AuthenticationService} from "../../../services/authentication.service";
import {Customer} from "../../../model/customer.model";
import {ConfirmDeletionModalComponent} from "../../../confirm-deletion-modal/confirm-deletion-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastService} from "angular-toastify";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit, OnDestroy {

  @Input()
  customerResponse: CustomerResponse;

  @Output()
  editCustomer = new EventEmitter<number>();

  @Output()
  customerDetail = new EventEmitter<number>();

  subscriptions: Subscription = new Subscription();
  sortable: Sortable
  pageable: Pageable
  column: string = 'id'
  asc: boolean = true;
  extendedRequest: ExtendedRequestModel;
  numbers: number[] = [5, 10, 15, 20, 25, 50, 100]
  pageNumber: number = 1;
  pageSize: number = 5;
  totalCount: number;
  isAdmin: boolean;

  @Output()
  paginationChange = new EventEmitter<number>();


  constructor(
    private customerService: CustomerService,
    private authService: AuthenticationService,
    private modalService: NgbModal,
    private toastService: ToastService,
    private router: Router) {
  }

  ngOnInit() {
    this.isAdminFn()
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onPageChange(pageNumber: number): void {
    this.pageable = new Pageable(pageNumber,this.pageSize)
    this.sortable = new Sortable(this.column,this.asc);
    this.extendedRequest = new ExtendedRequestModel(this.sortable,this.pageable);
    this.customerService.getCustomers(this.extendedRequest).subscribe(response => this.customerResponse = response)
  }

  sort(sortBy: any) {
    this.column = sortBy.column;
    this.asc = sortBy.ascending;
    if(sortBy.ascending === undefined){
      this.sortable = new Sortable('id', true);
    } else {
      this.sortable = new Sortable(sortBy.column, sortBy.ascending);
    }
    this.pageable = new Pageable(1, this.pageSize);
    this.extendedRequest = new ExtendedRequestModel(this.sortable, this.pageable);
    this.subscriptions.add(
      this.customerService.getCustomers(this.extendedRequest).subscribe(response => {
        this.customerResponse = response;
        this.pageNumber = response.pageNumber;
        this.pageSize = response.pageSize;
        this.totalCount = response.totalCount;
      }));
  }

  changeListingCount(count: number): void {
    this.pageSize = count;
    this.pageNumber = 1;
    this.sortable = new Sortable('id', true);
    this.pageable = new Pageable(this.pageNumber, this.pageSize);
    this.extendedRequest = new ExtendedRequestModel(this.sortable, this.pageable);
    this.subscriptions.add(
      this.customerService.getCustomers(this.extendedRequest).subscribe(response => {
        this.customerResponse = response;
        this.pageNumber = response.pageNumber;
        this.pageSize = response.pageSize;
        this.totalCount = response.totalCount;
      }));
  }

  delete(customer: Customer): void {
    const modal = this.modalService.open(ConfirmDeletionModalComponent)
    modal.closed.subscribe( result => {
      if (result) {
        this.subscriptions.add(
          this.customerService.deleteCustomer(customer.id).subscribe(() => {
            this.toastService.success('Successfully deleted the customer!')
            this.goBack()
          }));
      }
    })
  }

  isAdminFn(){
    if(this.authService.getUserRole() === 'USER'){
      this.isAdmin = false;
    }
    if(this.authService.getUserRole() === 'ADMINISTRATOR'){
      this.isAdmin = true;
    }
  }

  goBack(): void {
    this.router.navigate(['customers'])
  }

  protected readonly Number = Number;
}
