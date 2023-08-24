import {Component, OnInit} from '@angular/core';
import {BookCategory} from "../../model/bookCategory";
import {BookCategoriesService} from "../../book-categories.service";
import {MessageService} from "../../message.service";

@Component({
  selector: 'app-book-categories',
  templateUrl: './book-categories.component.html',
  styleUrls: ['./book-categories.component.css']
})
export class BookCategoriesComponent implements OnInit{

  bookCategories: BookCategory[] = [];

  constructor(private bookCategoriesService: BookCategoriesService, private messageService: MessageService) {
  }

  private log(message: string) {
    this.messageService.add(`BookCategoriesService: ${message}`);
  }

  ngOnInit(): void {
    this.getBookCategories();
  }

  getBookCategories(): void {
    this.bookCategoriesService.getBookCategories()
      .subscribe(bookCategories => this.bookCategories = bookCategories);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      this.log('Book category name cannot be empty!');
      return;
    }
    this.bookCategoriesService.addBookCategory({name} as BookCategory)
      .subscribe(bookCategory => {
        this.bookCategories.push(bookCategory)
      })
  };
}
