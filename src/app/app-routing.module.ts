import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthenticationComponent} from "./authentication/authentication-page/authentication.component";
import {RegistrationPageComponent} from "./authentication/registration-page/registration-page.component";
import {AdministrationPageComponent} from "./administration/administration-page/administration-page.component";
import {commonGuard} from "./common-guard/common.guard";
import {SearchComponent} from "./search/search.component";
import {commonAdminGuard} from "./common-guard/common-admin.guard";
import {SettingsPageComponent} from "./settings/settings-page/settings-page.component";

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
    canActivate: [commonAdminGuard]
  },
  {
    path: 'borrowings',
    canActivate: [commonAdminGuard],
    loadChildren: () => import('./borrowing/borrowing-module').then(m => m.BorrowingModule),
  },
  {
    path: 'users',
    canActivate: [commonAdminGuard],
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
  },
  {path: 'register', component: RegistrationPageComponent},
  {path: 'login', component: AuthenticationComponent},
  {path: 'logout', component: AuthenticationComponent},
  {path: 'administration', component: AdministrationPageComponent},
  {path: 'settings', component: SettingsPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
