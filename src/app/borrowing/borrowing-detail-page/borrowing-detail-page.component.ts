import {Component, Input, OnInit} from '@angular/core';
import {Borrowing, BorrowingCreate} from "../../model/borrowing.model";
import {ActivatedRoute, Router} from "@angular/router";
import {BorrowingService} from "../../services/borrowing.service";
import {BooksService} from "../../services/books.service";
import {CustomerService} from "../../services/customer.service";
import {Book} from "../../model/book.model";
import {Customer} from "../../model/customer.model";

@Component({
  selector: 'app-borrowing-page-detail',
  templateUrl: './borrowing-detail-page.component.html',
  styleUrls: ['./borrowing-detail-page.component.css']
})
export class BorrowingDetailPageComponent implements OnInit {

  @Input() borrowing?: Borrowing;

  private borrowingId: number

  bookList: Book[] = [];
  customerList: Customer[] = [];

  constructor(
    private route: ActivatedRoute,
    private borrowingService: BorrowingService,
    private router: Router,
    private bookService: BooksService,
    private customerService: CustomerService
  ) {
  }

  ngOnInit() {
    this.borrowingId = Number.parseInt(this.route.snapshot.paramMap.get('id')!);
    this.getBorrowing();
    this.getBooks();
    this.getCustomers();
  }

  goBack(): void {
    this.router.navigate(['borrowings'])
  }

  getBorrowing(): void {
    this.borrowingService.getBorrowing(this.borrowingId)
      .subscribe(borrowing => this.borrowing = borrowing);
  }

  getCustomers(): void {
    this.customerService.getCustomers()
      .subscribe(customers => this.customerList = customers);
  }

  getBooks(): void {
    this.bookService.getBooks()
      .subscribe(books => this.bookList = books);
  }

  deleteBorrowing(): void {
    this.borrowingService.deleteBorrowing(this.borrowingId).subscribe(() => this.goBack());
  }

  updateBorrowing(borrowing: BorrowingCreate) {
    if (this.borrowing) {
      this.borrowingService.updateBorrowing(this.borrowing.id, borrowing)
        .subscribe(response => this.borrowing = response);

    }
  }
}

