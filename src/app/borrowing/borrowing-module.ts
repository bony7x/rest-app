import {NgModule} from "@angular/core";
import {BorrowingPageComponent, BorrowingDetailPageComponent, BorrowingEditPageComponent} from "./pages";
import {BorrowingFormComponent, BorrowingListComponent, BorrowingSearchComponent} from "./components";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {BorrowingRoutingModule} from "./borrowing-routing.module";
import {SharedModule} from "../shared/shared.module";
import {BorrowingFilterFormComponent} from "./components/borrowing-filter-form/borrowing-filter-form.component";

@NgModule({
  declarations:[
    BorrowingPageComponent,
    BorrowingDetailPageComponent,
    BorrowingFormComponent,
    BorrowingListComponent,
    BorrowingSearchComponent,
    BorrowingEditPageComponent,
    BorrowingFilterFormComponent,
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        NgbModule,
        BorrowingRoutingModule,
        SharedModule,
    ],
  exports: [
    BorrowingSearchComponent
  ]
})

export class BorrowingModule{

}
