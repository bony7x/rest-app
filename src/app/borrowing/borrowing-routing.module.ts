import {RouterModule, Routes} from "@angular/router";
import {BorrowingPageComponent, BorrowingDetailPageComponent, BorrowingEditPageComponent} from "./pages";
import {NgModule} from "@angular/core";
import {adminGuard} from "./common/guards/admin.guard";
import {userGuard} from "./common/guards/user.guard";

const router: Routes = [
  {
    path: '',
    component: BorrowingPageComponent
  },
  {
    path: 'detail/:id',
    component: BorrowingDetailPageComponent,
    canActivate: [userGuard]
  },
  {
    path: 'edit/:id',
    component: BorrowingEditPageComponent,
    canActivate: [adminGuard]
  }
]

@NgModule({
  imports: [RouterModule.forChild(router)],
  exports: [RouterModule]
})

export class BorrowingRoutingModule{

}
