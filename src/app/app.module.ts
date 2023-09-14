import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BookPageComponent} from './book/book-page/book-page.component';
import {BookDetailPageComponent} from './book/book-detail-page/book-detail-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DashboardComponent} from './dashboard/dashboard.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BookSearchComponent} from './book/book-search/book-search.component';
import {BookCategoriesPageComponent} from './bookcategory/book-categories-page/book-categories-page.component';
import {
  BookCategoriesDetailPageComponent
} from './bookcategory/book-categories-detail-page/book-categories-detail-page.component';
import {BookCategoriesSearchComponent} from './bookcategory/book-categories-search/book-categories-search.component';
import {CustomerPageComponent} from './customer/customer-page/customer-page.component';
import {CustomerDetailPageComponent} from './customer/customer-detail-page/customer-detail-page.component';
import {CustomerSearchComponent} from './customer/customer-search/customer-search.component';
import {BorrowingPageComponent} from './borrowing/borrowing-page/borrowing-page.component';
import {BorrowingDetailPageComponent} from './borrowing/borrowing-detail-page/borrowing-detail-page.component';
import {BorrowingSearchComponent} from './borrowing/borrowing-search/borrowing-search.component';
import {BorrowingFormComponent} from './borrowing/borrowing-form/borrowing-form.component';
import {CustomerFormComponent} from './customer/customer-form/customer-form.component';
import {BookFormComponent} from './book/book-form/book-form.component';
import {BookListComponent} from './book/book-list/book-list.component';
import {CustomerListComponent} from './customer/customer-list/customer-list.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {BorrowingListComponent} from './borrowing/borrowing-list/borrowing-list.component';
import {BookCategoriesFormComponent} from './bookcategory/book-categories-form/book-categories-form.component';
import {BookCategoriesListComponent} from './bookcategory/book-categories-list/book-categories-list.component';
import {BookFormAddCategoryComponent} from './book/book-form-add-category/book-form-add-category.component';
import {BookFormRemoveCategoryComponent} from './book/book-form-remove-category/book-form-remove-category.component';
import {ErrorinterceptorInterceptor} from "./services/errorinterceptor.interceptor";
import {AngularToastifyModule, ToastService} from "angular-toastify";
import { ConfirmDeletionModalComponent } from './confirm-deletion-modal/confirm-deletion-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    BookPageComponent,
    BookDetailPageComponent,
    DashboardComponent,
    BookSearchComponent,
    BookCategoriesPageComponent,
    BookCategoriesDetailPageComponent,
    BookCategoriesSearchComponent,
    CustomerPageComponent,
    CustomerDetailPageComponent,
    CustomerSearchComponent,
    BorrowingPageComponent,
    BorrowingDetailPageComponent,
    BorrowingSearchComponent,
    BorrowingFormComponent,
    CustomerFormComponent,
    BookFormComponent,
    BookListComponent,
    CustomerListComponent,
    BorrowingListComponent,
    BookCategoriesFormComponent,
    BookCategoriesListComponent,
    BookFormAddCategoryComponent,
    BookFormRemoveCategoryComponent,
    ConfirmDeletionModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    AngularToastifyModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorinterceptorInterceptor,
    multi: true
  },
    ToastService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
