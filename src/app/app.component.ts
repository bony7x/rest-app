import {Component} from '@angular/core';
import {AuthenticationService} from "./services/authentication.service";
import {Router} from "@angular/router";
import {ToastService} from "angular-toastify";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Library';

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private toastService: ToastService) {
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/dashboard']);
      this.toastService.success('Successfully logged out!')
      localStorage.removeItem('token');
      localStorage.clear();
    });
  }

  isLogged(): boolean {
    return this.authService.isLogged();
  }

  isAdmin(): boolean{
    return this.authService.getUserRole() === 'ADMINISTRATOR'
  }

  goBack(): void {
    this.router.navigate(['dashboard'])
  }
}
