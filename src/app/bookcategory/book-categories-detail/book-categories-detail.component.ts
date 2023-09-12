import {Component, Input, OnInit} from '@angular/core';
import {BookCategory} from "../../model/bookCategory";
import {ActivatedRoute} from "@angular/router";
import {BookCategoriesService} from "../../services/book-categories.service";
import {Location} from "@angular/common";
import {Book} from "../../model/book.model";

@Component({
  selector: 'app-book-page-categories-detail',
  templateUrl: './book-categories-detail.component.html',
  styleUrls: ['./book-categories-detail.component.css']
})
export class BookCategoriesDetailComponent implements OnInit {

  @Input() bookCategory?: BookCategory;

  public categoryBookList: Array<Book> = new Array<Book>();

  constructor(private route: ActivatedRoute, private bookCategoriesService: BookCategoriesService, private location: Location) {
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
        bookCategory.books?.forEach(bookId => {
          console.log('id', bookId);
          //TODO:  Zavolam endpoint pre ziskanie detailu knihy a zapisem to do zoznamu categoryBookList
          // this.categoryBookList.push(.....)
        })
      });
  }

  delete(bookCategory: BookCategory): void {
    this.bookCategoriesService.deleteBookCategory(bookCategory.id).subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

  updateBookCategory(name: string): void {
    if (this.bookCategory) {
      this.bookCategory.name = name;
      this.bookCategoriesService.updateBookCategory(this.bookCategory)
        .subscribe(() => this.goBack());
    }
  }
}
