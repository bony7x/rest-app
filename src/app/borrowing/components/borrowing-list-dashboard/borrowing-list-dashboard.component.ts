import {Component, OnDestroy, OnInit} from '@angular/core';
import {Borrowing} from "../../../model/borrowing.model";
import {BorrowingService} from "../../../services/borrowing.service";
import {ExtendedRequestModel, Pageable, Sortable} from "../../../model/extended-request.model";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-borrowing-list-dashboard',
    templateUrl: './borrowing-list-dashboard.component.html',
    styleUrls: ['./borrowing-list-dashboard.component.css']
})
export class BorrowingListDashboardComponent implements OnInit, OnDestroy {

    borrowings: Borrowing[];
    sortable: Sortable = new Sortable('dateOfBorrowing', false);
    pageable: Pageable = new Pageable(1, 5);
    request: ExtendedRequestModel = new ExtendedRequestModel(this.sortable, this.pageable);
    subscriptions: Subscription = new Subscription();

    constructor(
        private borrowingService: BorrowingService) {
    }

    ngOnInit() {
        this.getLatestBorrowings()
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    getLatestBorrowings(): void {
        this.subscriptions.add(
            this.borrowingService.getBorrowings(this.request).subscribe(response => this.borrowings = response.borrowings)
    );
    }
}
