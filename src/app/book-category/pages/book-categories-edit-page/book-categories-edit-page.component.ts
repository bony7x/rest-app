import {Component, OnDestroy, OnInit} from '@angular/core';
import {BookCategory, BookCategoryCreate} from "../../../model/bookCategory";
import {ActivatedRoute, Router} from "@angular/router";
import {BookCategoriesService} from "../../../services/book-categories.service";
import {ToastService} from "angular-toastify";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-book-categories-edit-page',
  templateUrl: './book-categories-edit-page.component.html',
  styleUrls: ['./book-categories-edit-page.component.css']
})
export class BookCategoriesEditPageComponent implements OnInit, OnDestroy {
  bookCategory?: BookCategory;

  constructor(
    private route: ActivatedRoute,
    private bookCategoriesService: BookCategoriesService,
    private router: Router,
    private toastService: ToastService) {
  }

  subscriptions: Subscription = new Subscription();

  ngOnInit(): void {
    this.getBookCategory();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  getBookCategory(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.subscriptions.add(
      this.bookCategoriesService.getBookCategory(id)
        .subscribe(bookCategory => {
          this.bookCategory = bookCategory[0];
        }));
  };

  goBack(): void {
    this.router.navigate(['book-categories'])
  }

  updateBookCategory(category: BookCategoryCreate): void {
    if (this.bookCategory) {
      this.subscriptions.add(
        this.bookCategoriesService.updateBookCategory(this.bookCategory.id, category)
          .subscribe(response => {
            this.getBookCategory();
            this.toastService.success('Successfully updated book category!');
          }))
    }
  }

  routeBookAdmin(id: number): void {
    this.router.navigate(['books', 'edit', id]);
  }
}
