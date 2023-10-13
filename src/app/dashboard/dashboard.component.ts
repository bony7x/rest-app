import {Component, OnDestroy} from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {ExtendedRequestModel} from "../model/extended-request.model";
import {Subscription} from "rxjs";
import {BorrowingService} from "../services/borrowing.service";
import {Borrowing} from "../model/borrowing.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnDestroy {

  borrowings: Borrowing[];
  name: string | null;
  subscriptions: Subscription = new Subscription();

  constructor(
    private authService: AuthenticationService,
    private borrowingService: BorrowingService) {
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  isLogged(): boolean {
    if (this.authService.isLogged()) {
      this.getName();
      return true;
    }
    return false;
  }

  getName(): void {
    this.name = this.authService.getUserName();
  }

  getBorrowings(erm: ExtendedRequestModel): void {
    this.subscriptions.add(
      this.borrowingService.getBorrowings(erm).subscribe(response => this.borrowings = response.borrowings)
    );
  }
}
