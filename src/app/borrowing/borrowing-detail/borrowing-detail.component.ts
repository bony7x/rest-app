import {Component, Input, OnInit} from '@angular/core';
import {Borrowing, BorrowingCreate} from "../../model/borrowing.model";
import {ActivatedRoute} from "@angular/router";
import {BorrowingService} from "../../services/borrowing.service";
import {Location} from "@angular/common";
import {BooksService} from "../../services/books.service";
import {CustomerService} from "../../services/customer.service";
import {Book} from "../../model/book.model";
import {Customer} from "../../model/customer.model";

@Component({
  selector: 'app-borrowing-page-detail',
  templateUrl: './borrowing-detail.component.html',
  styleUrls: ['./borrowing-detail.component.css']
})
export class BorrowingDetailComponent implements OnInit{

  @Input() borrowing?: Borrowing;

  private borrowingId: number

  bookList: Book[]=[];
  customerList: Customer[] = [];

  constructor(
      private route:ActivatedRoute,
      private borrowingService: BorrowingService,
      private location: Location,
      private bookService: BooksService,
      private customerService: CustomerService
  ) {}

  ngOnInit() {
    this.borrowingId = Number.parseInt(this.route.snapshot.paramMap.get('id')!);
    this.getBorrowing();
    this.getBooks();
    this.getCustomers();
  }

  goBack(): void {
    this.location.back();
  }

  getBorrowing():  void {
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

  deleteBorrowing(): void{
    this.borrowingService.deleteBorrowing(this.borrowingId).subscribe(()=> this.goBack());
  }

  updateBorrowing(borrowing: BorrowingCreate) {
    if (this.borrowing) {
      this.borrowingService.updateBorrowing(this.borrowing.id,borrowing)
        .subscribe(response => this.borrowing = response);
    /*this.bookService.getBook(borrowing-page.bookId).subscribe(book-page => {
      this.book-page = book-page;
      this.customerService.getCustomer(borrowing-page.customerId).subscribe(customer-page => {
        this.customer-page = customer-page;
        const borrowing-page: Borrowing = {
          book-page,
          customer-page,
          dateOfBorrowing: new Date()
        };
        // @ts-ignore
        this.borrowingService.updateBorrowing(this.borrowing-page.id,borrowing-page)
          .subscribe(response => this.borrowing-page = response);
      });
    });*/
  }
/*    if(this.borrowing-page){
      this.borrowing-page = {
        ...this.borrowing-page,
        book-page: bookId,
        customer-page: customerId
      }
      this.borrowingService.updateBorrowing(this.borrowingId, this.borrowing-page)
          .subscribe(()=> this.goBack());
    }*/
  }

  protected readonly Number = Number;
}

