import {RouterModule, Routes} from "@angular/router";
import {BorrowingPageComponent, BorrowingDetailPageComponent} from "./pages";
import {NgModule} from "@angular/core";

const router: Routes = [
  {
    path: '',
    component: BorrowingPageComponent
  },
  {
    path: 'detail/:id',
    component: BorrowingDetailPageComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(router)],
  exports: [RouterModule]
})

export class BorrowingRoutingModule{

}
