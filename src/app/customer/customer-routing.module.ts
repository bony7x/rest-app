import {RouterModule, Routes} from "@angular/router";
import {CustomerDetailPageComponent, CustomerPageComponent} from "./pages";
import {NgModule} from "@angular/core";

const routes: Routes = [
  {
    path: "",
    component: CustomerPageComponent
  },
  {
    path:'detail/:id',
    component: CustomerDetailPageComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CustomerRoutingModule{

}
