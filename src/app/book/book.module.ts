import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookRoutingModule} from "./book-routing.module";
import {BookPageComponent} from "./book-page/book-page.component";
import {BookDetailPageComponent} from "./book-detail-page/book-detail-page.component";
import {BookFormComponent} from "./book-form/book-form.component";
import {BookFormUpdateCategoriesComponent} from "./book-form-update-categories/book-form-update-categories.component";
import {BookListComponent} from "./book-list/book-list.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {SortableDirective} from "../directives/sortable.directive";

@NgModule({
  declarations: [
    BookPageComponent,
    BookDetailPageComponent,
    BookFormComponent,
    BookFormUpdateCategoriesComponent,
    BookListComponent,
    SortableDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    BookRoutingModule
  ]
})
export class BookModule {
}
