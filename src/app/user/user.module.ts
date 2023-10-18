import {NgModule} from "@angular/core";
import {UserPageComponent} from "./pages";
import {UserListComponent, UserFilterFormComponent, UserFormComponent} from "./components";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {SharedModule} from "../shared/shared.module";
import {UserRoutingModule} from "./user-routing.module";
import { UserEditPageComponent } from './pages/user-edit-page/user-edit-page.component';

@NgModule({
  declarations:[
    UserPageComponent,
    UserListComponent,
    UserFilterFormComponent,
    UserEditPageComponent,
    UserFormComponent,
  ],
  imports:[
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    UserRoutingModule,
    SharedModule
  ],
})
export class UserModule{

}
