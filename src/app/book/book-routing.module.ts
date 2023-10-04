import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookDetailPageComponent, BookPageComponent, BookEditPageComponent} from "./pages";
import {adminGuard} from "./common/guards/admin.guard";
import {userGuard} from "./common/guards/user.guard";

const routes: Routes = [
  {
    path: '',
    component: BookPageComponent
  },
  {
    path: 'detail/:id',
    component: BookDetailPageComponent,
    canActivate: [userGuard]
  },
  {path: 'edit/:id',
  component: BookEditPageComponent,
  canActivate: [adminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule {
}
