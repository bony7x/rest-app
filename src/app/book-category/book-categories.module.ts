import {NgModule} from "@angular/core";
import {BookCategoriesDetailPageComponent, BookCategoriesEditPageComponent, BookCategoriesPageComponent} from "./pages";
import {
  BookCategoriesFilterFormComponent,
  BookCategoriesFormComponent,
  BookCategoriesListComponent,
  BookCategoriesSearchComponent
} from "./components";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {BookCategoriesRoutingModule} from "./book-categories-routing.module";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    BookCategoriesPageComponent,
    BookCategoriesDetailPageComponent,
    BookCategoriesFormComponent,
    BookCategoriesListComponent,
    BookCategoriesSearchComponent,
    BookCategoriesEditPageComponent,
    BookCategoriesFilterFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    BookCategoriesRoutingModule,
    SharedModule
  ],
  exports: [
    BookCategoriesSearchComponent
  ]
})

export class BookCategoriesModule {

}
