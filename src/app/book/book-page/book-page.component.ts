import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {Book, BookCreate} from "../../model/book.model";
import {BooksService} from "../../services/books.service";
import {Router} from "@angular/router";
import {NgbModal, NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import {Subscription} from "rxjs";
import {ToastService} from "angular-toastify";
import {ExtendedRequest} from "../../model/extended-request";
import {Sortable} from "../../model/sort.model";
import {PaginationComponent} from "../../model/page";

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css']
})
export class BookPageComponent implements OnInit , OnDestroy{

  books: Book[] = [];
  book: Book;
  subscriptions: Subscription = new Subscription();
  sortable: Sortable = new Sortable('id',true);
  pageable: PaginationComponent = new PaginationComponent(1,5)
  extendedRequest: ExtendedRequest = new ExtendedRequest(this.sortable,this.pageable);

  constructor(
    private bookService: BooksService,
    private router: Router,
    private modalService: NgbModal,
    private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.getBooks();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  getBooks(): void {
    this.subscriptions.add(
    this.bookService.getBooks(this.extendedRequest)
      .subscribe(books =>{
        this.books = books;
        this.toastService.success('Loaded all books!')
      }));
  }

  openModal(addBookModal: TemplateRef<any>): void {
    this.modalService.open(addBookModal);
  }

  add(book: BookCreate): void {
    this.bookService.addBook(book)
      .subscribe(() => {
        this.getBooks();
        this.toastService.success('Successfully added new book!')
      });
  }

  goBack(): void {
    this.router.navigate(['dashboard'])
  }

  editBook(id: number): void {
    this.router.navigate(['books', 'detail', id]);
  }
}
