import {Component} from '@angular/core';
import {AuthenticationService} from "./services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Library';

  constructor(private authService: AuthenticationService,
              private router: Router) {
  }

  logout(): void {
    this.authService.logout().subscribe( () => {
      this.router.navigate(['/dashboard']);
      localStorage.removeItem('token');
      localStorage.clear();
    });
  }
}
