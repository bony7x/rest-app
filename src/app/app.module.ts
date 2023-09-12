import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookPageComponent } from './book/book-page/book-page.component';
import { BookDetailPageComponent } from './book/book-detail-page/book-detail-page.component';
import { MessagesComponent } from './messages/messages.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DashboardComponent } from './dashboard/dashboard.component';
import {HttpClientModule} from "@angular/common/http";
import { BookSearchComponent } from './book/book-search/book-search.component';
import { BookCategoriesComponent } from './bookcategory/book-categories/book-categories.component';
import { BookCategoriesDetailComponent } from './bookcategory/book-categories-detail/book-categories-detail.component';
import { BookCategoriesSearchComponent } from './bookcategory/book-categories-search/book-categories-search.component';
import { CustomerPageComponent } from './customer/customer-page/customer-page.component';
import { CustomerDetailPageComponent } from './customer/customer-detail-page/customer-detail-page.component';
import { CustomerSearchComponent } from './customer/customer-search/customer-search.component';
import { BorrowingPageComponent } from './borrowing/borrowing-page/borrowing-page.component';
import { BorrowingDetailComponent } from './borrowing/borrowing-detail/borrowing-detail.component';
import { BorrowingSearchComponent } from './borrowing/borrowing-search/borrowing-search.component';
import { BorrowingFormComponent } from './borrowing/borrowing-form/borrowing-form.component';
import { CustomerFormComponent } from './customer/customer-form/customer-form.component';
import { BookFormComponent } from './book/book-form/book-form.component';
import { BookListComponent } from './book/book-list/book-list.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { BorrowingListComponent } from './borrowing/borrowing-list/borrowing-list.component';

@NgModule({
  declarations: [
    AppComponent,
    BookPageComponent,
    BookDetailPageComponent,
    MessagesComponent,
    DashboardComponent,
    BookSearchComponent,
    BookCategoriesComponent,
    BookCategoriesDetailComponent,
    BookCategoriesSearchComponent,
    CustomerPageComponent,
    CustomerDetailPageComponent,
    CustomerSearchComponent,
    BorrowingPageComponent,
    BorrowingDetailComponent,
    BorrowingSearchComponent,
    BorrowingFormComponent,
    CustomerFormComponent,
    BookFormComponent,
    BookListComponent,
    CustomerListComponent,
    BorrowingListComponent
  ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        NgbModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
