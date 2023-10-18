import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {UserResponse} from "../../../responses/UserResponse";
import {Subscription} from "rxjs";
import {ExtendedRequestModel, Pageable, Sortable} from "../../../model/extended-request.model";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastService} from "angular-toastify";
import {AuthenticationService} from "../../../services/authentication.service";
import {ConfirmDeletionModalComponent} from "../../../confirm-deletion-modal/confirm-deletion-modal.component";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit, OnDestroy {

  userResponse: UserResponse;
  subscriptions: Subscription = new Subscription();
  pageNumber: number = 1;
  pageSize: number = 5;
  totalCount: number = 0;
  column: string = 'id';
  ascending: boolean = true;
  sortable: Sortable;
  pageable: Pageable;
  map = new Map<string, string>()
    .set('name', '')
    .set('email', '')
  extendedRequest: ExtendedRequestModel;
  isAdmin = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private modalService: NgbModal,
    private toastService: ToastService,
    private authService: AuthenticationService,
  ) {
  }

  ngOnInit() {
    this.getUsers();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getUsers(): void {
    this.pageable = new Pageable(this.pageNumber, this.pageSize)
    this.sortable = new Sortable(this.column, this.ascending);
    this.extendedRequest = new ExtendedRequestModel(this.sortable, this.pageable)
    this.extendedRequest.filter = Object.fromEntries(this.map);
    this.subscriptions.add(
      this.userService.getUsersRequest(this.extendedRequest).subscribe(
        response => {
          this.userResponse = response;
          this.pageSize = response.pageSize;
          this.pageNumber = response.pageNumber;
          this.totalCount = response.totalCount;
        })
    )
  }

  onPageChange(pageNumber: number): void {
    this.pageNumber = pageNumber;
    this.getUsers();
  }

  onSortChange(sortable: Sortable): void {
    this.column = sortable.column;
    this.ascending = sortable.ascending
    this.pageNumber = 1;
    this.getUsers();
  }

  onListingChange(pageable: Pageable): void {
    this.pageNumber = pageable.pageNumber;
    this.pageSize = pageable.pageSize
    this.getUsers();
  }

  openModal(addBookModal: TemplateRef<any>): void {
    this.modalService.open(addBookModal);
  }

  editUser(id: number): void {
    this.router.navigate(['users', 'edit', id]);
  }

  deleteUser(id: number): void {
    const modal = this.modalService.open(ConfirmDeletionModalComponent)
    modal.closed.subscribe(result => {
      if (result) {
        this.subscriptions.add(
          this.userService.deleteUser(id).subscribe(() => {
            this.toastService.success('User was successfully deleted!');
            this.getUsers();
          })
        )
      }
    })
  }

  filterUsers(map: Map<string, string>): void {
    this.map = map;
    this.getUsers();
  }

  goBack(): void {
    this.router.navigate(['dashboard'])
  }
}
