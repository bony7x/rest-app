import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookPageComponent} from "./book/book-page/book-page.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {BookDetailPageComponent} from "./book/book-detail-page/book-detail-page.component";
import {BookCategoriesPageComponent} from "./bookcategory/book-categories-page/book-categories-page.component";
import {BookCategoriesDetailPageComponent} from "./bookcategory/book-categories-detail-page/book-categories-detail-page.component";
import {CustomerDetailPageComponent} from "./customer/customer-detail-page/customer-detail-page.component";
import {CustomerPageComponent} from "./customer/customer-page/customer-page.component";
import {BorrowingPageComponent} from "./borrowing/borrowing-page/borrowing-page.component";
import {BorrowingDetailPageComponent} from "./borrowing/borrowing-detail-page/borrowing-detail-page.component";
import {AuthenticationComponent} from "./authentication/authentication-page/authentication.component";

const routes: Routes = [
  {path: 'books', component: BookPageComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'books/detail/:id', component: BookDetailPageComponent},
  {path: 'book-categories', component: BookCategoriesPageComponent},
  {path: 'book-categories/detail/:id', component: BookCategoriesDetailPageComponent},
  {path: 'customers',component:CustomerPageComponent},
  {path: 'customers/detail/:id', component: CustomerDetailPageComponent},
  {path: 'borrowings', component:BorrowingPageComponent},
  {path: 'borrowings/detail/:id', component:BorrowingDetailPageComponent},
  {path: 'register', component: AuthenticationComponent},
  {path: 'login', component: AuthenticationComponent},
  {path: 'logout', component: AuthenticationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
