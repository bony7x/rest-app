import {Component, OnDestroy, OnInit} from '@angular/core';
import {BookCategory} from "../../../model/bookCategory";
import {ActivatedRoute, Router} from "@angular/router";
import {BookCategoriesService} from "../../../services/book-categories.service";
import {Subscription} from "rxjs";

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
    private router: Router) {
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

  routeBookUser(id: number) {
    this.router.navigate(['books', 'detail', id])
  }
}
