import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookDetailPageComponent, BookPageComponent} from "./pages";
import {adminGuard} from "./common/guards/admin.guard";
import {BookEditPageComponent} from "./pages/book-edit-page/book-edit-page.component";

const routes: Routes = [
  {
    path: '',
    component: BookPageComponent
  },
  {
    path: 'detail/:id',
    component: BookDetailPageComponent,
    canActivate: [adminGuard]
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
