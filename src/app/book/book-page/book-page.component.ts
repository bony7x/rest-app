import {Component, EventEmitter, OnDestroy, OnInit, Output, TemplateRef} from '@angular/core';
import {Book, BookCreate} from "../../model/book.model";
import {BooksService} from "../../services/books.service";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Subscription} from "rxjs";
import {ToastService} from "angular-toastify";
import {Extendedrequest} from "../../model/extendedrequest";
import {Sortable} from "../../model/sortable";
import {Pageable} from "../../model/pageable";
import {BookResponse} from "../../responses/BookResponse";

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css']
})
export class BookPageComponent implements OnInit , OnDestroy{

  bookResponse: BookResponse;
  book: Book;
  subscriptions: Subscription = new Subscription();
  pageNumber: number = 1;
  pageSize: number = 5;
  sortable: Sortable = new Sortable('id',true);
  pageable: Pageable = new Pageable(this.pageNumber,this.pageSize)
  extendedRequest: Extendedrequest = new Extendedrequest(this.sortable,this.pageable);

  @Output()
  paginationChange = new EventEmitter<number>();

  constructor(
    private bookService: BooksService,
    private router: Router,
    private modalService: NgbModal,
    private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.getBooks(this.pageNumber);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  getBooks(pageNumber: number): void {
    console.log(this.extendedRequest)
    this.extendedRequest.pageable.pageNumber = pageNumber;
    this.subscriptions.add(
    this.bookService.getBooks(this.extendedRequest)
      .subscribe(response =>{
        this.bookResponse = response;
        this.toastService.success('Loaded all books!')
      }));
  }

  onPageChange(pageNumber: number):void{
    this.getBooks(pageNumber)
  }

  openModal(addBookModal: TemplateRef<any>): void {
    this.modalService.open(addBookModal);
  }

  add(book: BookCreate): void {
    this.bookService.addBook(book)
      .subscribe(() => {
        this.getBooks(this.pageNumber);
        this.toastService.success('Successfully added new book!')
      });
  }

  goBack(): void {
    this.router.navigate(['dashboard'])
  }

  editBook(id: number): void {
    this.router.navigate(['books', 'detail', id]);
  }

  protected readonly Number = Number;
}
