import {RouterModule, Routes} from "@angular/router";
import {BookCategoriesPageComponent, BookCategoriesDetailPageComponent, BookCategoriesEditPageComponent} from "./pages";
import {NgModule} from "@angular/core";
import {adminGuard} from "./common/guards/admin.guard";
import {userGuard} from "./common/guards/user.guard";

const routes: Routes = [
  {
    path: "",
    component: BookCategoriesPageComponent
  },
  {
    path: 'detail/:id',
    component: BookCategoriesDetailPageComponent,
    canActivate: [userGuard]
  },
  {
    path: 'edit/:id',
    component: BookCategoriesEditPageComponent,
    canActivate: [adminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class BookCategoriesRoutingModule{

}
