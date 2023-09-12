import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {BookCategory, BookCategoryCreate} from "../../model/bookCategory";
import {BookCategoriesService} from "../../services/book-categories.service";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-book-page-categories',
  templateUrl: './book-categories-page.component.html',
  styleUrls: ['./book-categories-page.component.css']
})
export class BookCategoriesPageComponent implements OnInit, OnDestroy {

  bookCategories: BookCategory[] = [];

  private categoriesSubscriber : Subscription;
  constructor(
    private bookCategoriesService: BookCategoriesService,
    private router: Router,
    private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.getBookCategories();
  }
  ngOnDestroy() {
    if(this.categoriesSubscriber){
      this.categoriesSubscriber.unsubscribe();
    }
  }

  getBookCategories(): void {
    this.bookCategoriesService.getBookCategories()
      .subscribe(bookCategories => this.bookCategories = bookCategories);
  }

  openModal(addCategoryModal: TemplateRef<any>): void {
    this.modalService.open(addCategoryModal);
  }

  add(category: BookCategoryCreate): void {
    this.bookCategoriesService.addBookCategory(category)
      .subscribe(category => this.bookCategories.push(category))
  }

  goBack(): void {
    this.router.navigate(['dashboard'])
  }

  editCategory(id: number): void {
    this.router.navigate(['book-categories', 'detail', id]);
  }
}
