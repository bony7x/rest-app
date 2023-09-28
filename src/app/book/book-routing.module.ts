import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookPageComponent} from "./book-page/book-page.component";
import {BookDetailPageComponent} from "./book-detail-page/book-detail-page.component";

const routes: Routes = [
  {
    path: '',
    component: BookPageComponent
  },
  {
    path: 'detail/:id',
    component: BookDetailPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule {
}
