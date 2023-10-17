import {RouterModule, Routes} from "@angular/router";
import {UserPageComponent} from "./pages";
import {NgModule} from "@angular/core";

const routes: Routes = [
  {
    path: '',
    component: UserPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserRoutingModule {

}
