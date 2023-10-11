import {NgModule} from "@angular/core";
import {BookCategoriesPageComponent, BookCategoriesDetailPageComponent, BookCategoriesEditPageComponent} from "./pages";
import {BookCategoriesFormComponent, BookCategoriesListComponent, BookCategoriesSearchComponent} from "./components";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {BookCategoriesRoutingModule} from "./book-categories-routing.module";
import {SharedModule} from "../shared/shared.module";
import { BookCategoriesFilterFormComponent } from './components/book-categories-filter-form/book-categories-filter-form.component';

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

export class BookCategoriesModule{

}
