import {Component} from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent{

  name: string | null;

  constructor(
    private authService: AuthenticationService) {
  }

  isLogged(): boolean{
    if(this.authService.isLogged()){
      this.getName();
      return true;
    }
    return false;
  }

  getName(): void{
    this.name = this.authService.getUserName();
  }
}
