import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BooksComponent} from "./book/books/books.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {BookDetailComponent} from "./book/book-detail/book-detail.component";
import {BookCategoriesComponent} from "./bookcategory/book-categories/book-categories.component";
import {BookCategoriesDetailComponent} from "./bookcategory/book-categories-detail/book-categories-detail.component";
import {CustomerDetailComponent} from "./customer/customer-detail/customer-detail.component";
import {CustomerComponent} from "./customer/customer/customer.component";

const routes: Routes = [
  {path: 'books', component: BooksComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'detail/:id', component: BookDetailComponent},
  {path: 'book-categories', component: BookCategoriesComponent},
  {path: 'book-categories/detail/:id', component: BookCategoriesDetailComponent},
  {path: 'customers',component:CustomerComponent},
  {path: 'customers/detail/:id', component: CustomerDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
