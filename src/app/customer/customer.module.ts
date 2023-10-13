import {NgModule} from "@angular/core";
import {CustomerDetailPageComponent, CustomerEditPageComponent, CustomerPageComponent} from "./pages";
import {
  CustomerFilterFormComponent,
  CustomerFormComponent,
  CustomerListComponent,
  CustomerSearchComponent
} from "./components";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {CustomerRoutingModule} from "./customer-routing.module";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    CustomerPageComponent,
    CustomerDetailPageComponent,
    CustomerListComponent,
    CustomerFormComponent,
    CustomerSearchComponent,
    CustomerEditPageComponent,
    CustomerFilterFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    CustomerRoutingModule,
    SharedModule
  ],
  exports: [
    CustomerSearchComponent
  ]
})

export class CustomerModule {

}
