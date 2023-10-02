import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SortableDirective} from "./directives/sortable.directive";

@NgModule({
  declarations: [
    SortableDirective
  ],
  exports: [
    SortableDirective
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
