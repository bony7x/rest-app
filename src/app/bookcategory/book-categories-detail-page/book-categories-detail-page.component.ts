import {Component, OnDestroy, OnInit} from '@angular/core';
import {BookCategory, BookCategoryCreate} from "../../model/bookCategory";
import {ActivatedRoute, Router} from "@angular/router";
import {BookCategoriesService} from "../../services/book-categories.service";
import {Subscription} from "rxjs";
import {ToastService} from "angular-toastify";

@Component({
  selector: 'app-book-page-categories-detail',
  templateUrl: './book-categories-detail-page.component.html',
  styleUrls: ['./book-categories-detail-page.component.css']
})
export class BookCategoriesDetailPageComponent implements OnInit, OnDestroy {

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
        this.bookCategory = bookCategory;
        this.toastService.success('Loaded book category!');
      }));
  };

  delete(bookCategory: BookCategory): void {
    this.subscriptions.add(
      this.bookCategoriesService.deleteBookCategory(bookCategory.id).subscribe(() => {
        this.toastService.success('Successfully deleted book category!')
        this.goBack()
      }));
  }

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
}
