import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SettingsPageComponent} from "./pages";

const routes: Routes = [
  {
    path: '',
    component: SettingsPageComponent
  }
]

@NgModule({
  exports: [RouterModule]
})
export class SettingsRoutingModule {
}
