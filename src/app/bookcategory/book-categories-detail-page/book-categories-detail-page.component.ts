import {Component, Input, OnInit} from '@angular/core';
import {BookCategory, BookCategoryCreate} from "../../model/bookCategory";
import {ActivatedRoute, Router} from "@angular/router";
import {BookCategoriesService} from "../../services/book-categories.service";
import {Book} from "../../model/book.model";

@Component({
  selector: 'app-book-page-categories-detail',
  templateUrl: './book-categories-detail-page.component.html',
  styleUrls: ['./book-categories-detail-page.component.css']
})
export class BookCategoriesDetailPageComponent implements OnInit {

  @Input() bookCategory?: BookCategory;

  public categoryBookList: Array<Book> = new Array<Book>();

  constructor(
    private route: ActivatedRoute,
    private bookCategoriesService: BookCategoriesService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.getBookCategory();
  }

  getBookCategory(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.categoryBookList = [];
    this.bookCategoriesService.getBookCategory(id)
      .subscribe(bookCategory => {
        this.bookCategory = bookCategory
      })
  };

  delete(bookCategory: BookCategory): void {
    this.bookCategoriesService.deleteBookCategory(bookCategory.id).subscribe(() => this.goBack());
  }

  goBack(): void {
    this.router.navigate(['book-categories'])
  }

  updateBookCategory(category: BookCategoryCreate): void {
    if (this.bookCategory) {
      this.bookCategoriesService.updateBookCategory(this.bookCategory.id,category)
        .subscribe(response => this.bookCategory = response);
    }
  }
}
