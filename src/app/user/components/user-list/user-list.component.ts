import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Pageable, Sortable} from "../../../model/extended-request.model";
import {AuthenticationService} from "../../../services/authentication.service";
import {UserResponse} from "../../../responses/UserResponse";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {

  @Input()
  userResponse?: UserResponse;

  sortable: Sortable
  pageable: Pageable
  column: string = 'id';
  numbers: number[] = [5, 10, 15, 20, 25, 50, 100]
  isAdmin: boolean = false;

  @Output()
  sortingChange = new EventEmitter<Sortable>();

  @Output()
  listingChange = new EventEmitter<Pageable>();

  @Output()
  editUser = new EventEmitter<number>();

  @Output()
  deleteUser = new EventEmitter<number>();

  constructor(
    private authService: AuthenticationService,) {
  }

  ngOnInit() {
    this.isAdminFn();
  }

  sort(sortBy: any): void {
    this.column = sortBy.column;
    this.sortable = new Sortable(sortBy.column, sortBy.ascending);
    this.sortingChange.emit(this.sortable);
  }

  changeListingCount(count: number): void {
    this.pageable = new Pageable(1, count);
    this.listingChange.emit(this.pageable);
  }

  isAdminFn() {
    if (this.authService.getUserRole() === 'USER') {
      this.isAdmin = false;
    }
    if (this.authService.getUserRole() === 'ADMINISTRATOR') {
      this.isAdmin = true;
    }
  }

  protected readonly Number = Number;
}
