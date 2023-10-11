import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DashboardComponent} from './dashboard/dashboard.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ErrorInterceptor} from "./services/error.interceptor";
import {AngularToastifyModule, ToastService} from "angular-toastify";
import {ConfirmDeletionModalComponent} from './confirm-deletion-modal/confirm-deletion-modal.component';
import {AuthenticationComponent} from './authentication/authentication-page/authentication.component';
import {LoginFormComponent} from './authentication/login-form/login-form.component';
import {RegistrationPageComponent} from './authentication/registration-page/registration-page.component';
import {BookModule} from "./book/book.module";
import {BookCategoriesModule} from "./book-category/book-categories.module";
import {BorrowingModule} from "./borrowing/borrowing-module";
import {CustomerModule} from "./customer/customer.module";
import {AdministrationPageComponent} from './administration/administration-page/administration-page.component';
import {
  AdministrationPageFormComponent
} from './administration/administration-page-form/administration-page-form.component';
import {SearchComponent} from './search/search.component';
import {
  BorrowingListDashboardComponent
} from './borrowing/components/borrowing-list-dashboard/borrowing-list-dashboard.component';
import {SharedModule} from "./shared/shared.module";
import {ShowHidePasswordComponent} from './authentication/show-hide-password/show-hide-password.component';
import {
  BorrowingFilterFormComponent
} from './borrowing/components/borrowing-filter-form/borrowing-filter-form.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ConfirmDeletionModalComponent,
    AuthenticationComponent,
    LoginFormComponent,
    RegistrationPageComponent,
    AdministrationPageComponent,
    AdministrationPageFormComponent,
    SearchComponent,
    BorrowingListDashboardComponent,
    ShowHidePasswordComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    AngularToastifyModule,
    BookModule,
    BookCategoriesModule,
    CustomerModule,
    SharedModule,
    BorrowingModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
  },
    ToastService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
