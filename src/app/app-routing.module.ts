import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthenticationComponent} from "./authentication/authentication-page/authentication.component";
import {RegistrationPageComponent} from "./authentication/registration-page/registration-page.component";
import {AdministrationPageComponent} from "./administration/administration-page/administration-page.component";
import {commonGuard} from "./common-guard/common.guard";
import {SearchComponent} from "./search/search.component";

const routes: Routes = [
  {
    path: 'books',
    loadChildren: () => import('./book/book.module').then(m => m.BookModule),
    canActivate: [commonGuard]
  },
  {path: 'search', component: SearchComponent},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {
    path: 'book-categories',
    loadChildren: () => import('./book-category/book-categories.module').then(m => m.BookCategoriesModule),
    canActivate: [commonGuard]
  },
  {
    path: 'customers',
    loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule),
    canActivate: [commonGuard]
  },
  {
    path: 'borrowings',
    canActivate: [commonGuard],
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
