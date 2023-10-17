import { Component } from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  constructor(
    private authService: AuthenticationService
  ) {
  }

  isAdmin(): boolean{
    return this.authService.getUserRole() === 'ADMINISTRATOR';
  }
}
