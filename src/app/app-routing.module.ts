import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthenticationComponent} from "./authentication/authentication-page/authentication.component";
import {RegistrationPageComponent} from "./authentication/registration-page/registration-page.component";
import {AuthGuard} from "./guard/auth.guard";
import {AdministrationPageComponent} from "./administration/administration-page/administration-page.component";

const routes: Routes = [
  {
    path: 'books',
    loadChildren: () => import('./book/book.module').then(m => m.BookModule),
    canActivate: [AuthGuard]
  },
  {path: 'dashboard', component: DashboardComponent},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {
    path: 'book-categories',
    loadChildren: () => import('./bookcategory/book-categories.module').then(m => m.BookCategoriesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'customers',
    loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'borrowings',
    canActivate: [AuthGuard],
    loadChildren: () => import('./borrowing/borrowing-module').then(m => m.BorrowingModule),
  },
  {path: 'register', component: RegistrationPageComponent},
  {path: 'login', component: AuthenticationComponent},
  {path: 'logout', component: AuthenticationComponent},
  {path: 'administration', component: AdministrationPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
