import {RouterModule, Routes} from "@angular/router";
import {BookCategoriesPageComponent, BookCategoriesDetailPageComponent} from "./pages";
import {NgModule} from "@angular/core";

const routes: Routes = [
  {
    path: "",
    component: BookCategoriesPageComponent
  },
  {
    path: 'detail/:id',
    component: BookCategoriesDetailPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class BookCategoriesRoutingModule{

}
