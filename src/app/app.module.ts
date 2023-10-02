import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DashboardComponent} from './dashboard/dashboard.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ErrorinterceptorInterceptor} from "./services/errorinterceptor.interceptor";
import {AngularToastifyModule, ToastService} from "angular-toastify";
import {ConfirmDeletionModalComponent} from './confirm-deletion-modal/confirm-deletion-modal.component';
import {AuthenticationComponent} from './authentication/authentication-page/authentication.component';
import {LoginFormComponent} from './authentication/login-form/login-form.component';
import {RegistrationPageComponent} from './authentication/registration-page/registration-page.component';
import {BookModule} from "./book/book.module";
import {BookCategoriesModule} from "./bookcategory/book-categories.module";
import {BorrowingModule} from "./borrowing/borrowing-module";
import {CustomerModule} from "./customer/customer.module";
import { AdministrationPageComponent } from './administration/administration-page/administration-page.component';
import { AdministrationPageFormComponent } from './administration/administration-page-form/administration-page-form.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ConfirmDeletionModalComponent,
    AuthenticationComponent,
    LoginFormComponent,
    RegistrationPageComponent,
    AdministrationPageComponent,
    AdministrationPageFormComponent
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
    BorrowingModule,
    CustomerModule
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
