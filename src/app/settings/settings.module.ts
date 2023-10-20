import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterCustomerFormComponent, UserUpdateFormComponent} from "./components";
import {SettingsPageComponent} from "./pages";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {SettingsRoutingModule} from "./settings-routing.module";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    RegisterCustomerFormComponent,
    UserUpdateFormComponent,
    SettingsPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    SettingsRoutingModule,
    SharedModule
  ]
})
export class SettingsModule {
}
