import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookPageComponent} from "./book/book-page/book-page.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {BookDetailPageComponent} from "./book/book-detail-page/book-detail-page.component";
import {BookCategoriesComponent} from "./bookcategory/book-categories/book-categories.component";
import {BookCategoriesDetailComponent} from "./bookcategory/book-categories-detail/book-categories-detail.component";
import {CustomerDetailPageComponent} from "./customer/customer-detail-page/customer-detail-page.component";
import {CustomerPageComponent} from "./customer/customer-page/customer-page.component";
import {BorrowingPageComponent} from "./borrowing/borrowing-page/borrowing-page.component";
import {BorrowingDetailComponent} from "./borrowing/borrowing-detail/borrowing-detail.component";

const routes: Routes = [
  {path: 'books', component: BookPageComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'books/detail/:id', component: BookDetailPageComponent},
  {path: 'book-categories', component: BookCategoriesComponent},
  {path: 'book-categories/detail/:id', component: BookCategoriesDetailComponent},
  {path: 'customers',component:CustomerPageComponent},
  {path: 'customers/detail/:id', component: CustomerDetailPageComponent},
  {path: 'borrowings', component:BorrowingPageComponent},
  {path: 'borrowings/detail/:id', component:BorrowingDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
