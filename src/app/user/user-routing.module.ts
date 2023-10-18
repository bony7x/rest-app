import {RouterModule, Routes} from "@angular/router";
import {UserPageComponent} from "./pages";
import {NgModule} from "@angular/core";
import {UserEditPageComponent} from "./pages/user-edit-page/user-edit-page.component";
import {adminGuard} from "./common/guards/admin.guard";

const routes: Routes = [
  {
    path: '',
    component: UserPageComponent
  },
  {
    path: 'edit/:id',
    component: UserEditPageComponent,
    canActivate: [adminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserRoutingModule {

}
