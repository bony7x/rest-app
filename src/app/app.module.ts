import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksComponent } from './book/books/books.component';
import { BookDetailComponent } from './book/book-detail/book-detail.component';
import { MessagesComponent } from './messages/messages.component';
import {FormsModule} from "@angular/forms";
import { DashboardComponent } from './dashboard/dashboard.component';
import {HttpClientModule} from "@angular/common/http";
import { BookSearchComponent } from './book/book-search/book-search.component';
import { BookCategoriesComponent } from './bookcategory/book-categories/book-categories.component';
import { BookCategoriesDetailComponent } from './bookcategory/book-categories-detail/book-categories-detail.component';
import { BookCategoriesSearchComponent } from './bookcategory/book-categories-search/book-categories-search.component';
import { CustomerComponent } from './customer/customer/customer.component';
import { CustomerDetailComponent } from './customer/customer-detail/customer-detail.component';
import { CustomerSearchComponent } from './customer/customer-search/customer-search.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    BookDetailComponent,
    MessagesComponent,
    DashboardComponent,
    BookSearchComponent,
    BookCategoriesComponent,
    BookCategoriesDetailComponent,
    BookCategoriesSearchComponent,
    CustomerComponent,
    CustomerDetailComponent,
    CustomerSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
