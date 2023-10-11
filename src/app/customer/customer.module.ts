import {NgModule} from "@angular/core";
import {CustomerPageComponent, CustomerDetailPageComponent, CustomerEditPageComponent} from "./pages";
import {CustomerListComponent, CustomerFormComponent, CustomerSearchComponent} from "./components";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {CustomerRoutingModule} from "./customer-routing.module";
import {SharedModule} from "../shared/shared.module";
import { CustomerFilterFormComponent } from './components/customer-filter-form/customer-filter-form.component';

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

export  class CustomerModule{

}
