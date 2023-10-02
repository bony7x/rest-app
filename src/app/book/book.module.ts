import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookRoutingModule} from "./book-routing.module";
import {BookDetailPageComponent, BookPageComponent} from "./pages";
import {
  BookFormComponent,
  BookFormUpdateCategoriesComponent,
  BookListComponent,
  BookSearchComponent
} from "./components";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {SharedModule} from "../shared/shared.module";
import { BookEditPageComponent } from './pages/book-edit-page/book-edit-page.component';

@NgModule({
  declarations: [
    BookPageComponent,
    BookDetailPageComponent,
    BookFormComponent,
    BookFormUpdateCategoriesComponent,
    BookListComponent,
    BookSearchComponent,
    BookEditPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    BookRoutingModule,
    SharedModule
  ],
  exports: [
    BookSearchComponent
  ]
})
export class BookModule {
}
