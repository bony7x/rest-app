import {Component, EventEmitter, OnDestroy, OnInit, Output, TemplateRef} from '@angular/core';
import {CustomerCreate} from "../../../model/customer.model";
import {CustomerService} from "../../../services/customer.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastService} from "angular-toastify";
import {ExtendedRequestModel, Pageable, Sortable} from "../../../model/extended-request.model";
import {CustomerResponse} from "../../../responses/CustomerResponse";
import {AuthenticationService} from "../../../services/authentication.service";
import {ConfirmDeletionModalComponent} from "../../../confirm-deletion-modal/confirm-deletion-modal.component";

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
  totalCount: number = 0;
  column: string = 'id';
  ascending: boolean = true;
  sortable: Sortable;
  pageable: Pageable;
  extendedRequest: ExtendedRequestModel;
  map = new Map<string, string>()
    .set('firstName', '')
    .set('lastName', '')
    .set('email', '');
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
    this.getCustomers();
    this.isAdminFn();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getCustomers(): void {
    this.pageable = new Pageable(this.pageNumber, this.pageSize)
    this.sortable = new Sortable(this.column, this.ascending);
    this.extendedRequest = new ExtendedRequestModel(this.sortable, this.pageable)
    this.extendedRequest.filter = Object.fromEntries(this.map);
    this.subscriptions.add(
      this.customerService.getCustomers(this.extendedRequest)
        .subscribe(response => {
          this.customerResponse = response;
          this.pageSize = response.pageSize;
          this.pageNumber = response.pageNumber;
          this.totalCount = response.totalCount;
        }));
  }

  onPageChange(pageNumber: number): void {
    this.pageNumber = pageNumber;
    this.getCustomers()
  }

  onSortChange(sortable: Sortable): void {
    this.column = sortable.column;
    this.ascending = sortable.ascending
    this.pageNumber = 1;
    this.getCustomers();
  }

  onListingChange(pageable: Pageable): void {
    this.pageNumber = pageable.pageNumber;
    this.pageSize = pageable.pageSize
    this.getCustomers();
  }

  openModal(addCustomerModal: TemplateRef<any>): void {
    this.modalService.open(addCustomerModal);
  }

  add(customer: CustomerCreate): void {
    this.subscriptions.add(
      this.customerService.addCustomer(customer)
        .subscribe(customer => {
          this.getCustomers();
          this.toastService.success('Successfully added new customer!');
        }));
  }

  goBack(): void {
    this.router.navigate(['dashboard'])
  }

  editCustomer(id: number): void {
    this.router.navigate(['customers', 'edit', id]);
  }

  showCustomerDetail(id: number) {
    this.router.navigate(['customers', 'detail', id]);
  }

  isAdminFn() {
    if (this.authService.getUserRole() === 'USER') {
      this.isAdmin = false;
    }
    if (this.authService.getUserRole() === 'ADMINISTRATOR') {
      this.isAdmin = true;
    }
  }

  filterCustomers(map: Map<string, string>): void {
    this.map = map;
    this.getCustomers();
  }

  deleteCustomer(id: number): void {
    const modal = this.modalService.open(ConfirmDeletionModalComponent)
    modal.closed.subscribe(result => {
      if (result) {
        this.subscriptions.add(
          this.customerService.deleteCustomer(id).subscribe(() => {
            this.toastService.success('Successfully deleted the customer!')
            this.getCustomers();
          }));
      }
    })
  }
}
