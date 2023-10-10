import {RouterModule, Routes} from "@angular/router";
import {CustomerDetailPageComponent, CustomerEditPageComponent, CustomerPageComponent} from "./pages";
import {NgModule} from "@angular/core";
import {adminGuard} from "./common/guards/admin.guard";
import {userGuard} from "./common/guards/user.guard";

const routes: Routes = [
  {
    path: "",
    component: CustomerPageComponent
  },
  {
    path:'detail/:id',
    component: CustomerDetailPageComponent,
    canActivate: [adminGuard]
  },
  {
    path: 'edit/:id',
    component: CustomerEditPageComponent,
    canActivate: [adminGuard]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CustomerRoutingModule{

}
