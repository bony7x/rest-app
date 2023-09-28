import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Injectable} from "@angular/core";
import {AuthenticationService} from "../services/authentication.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthenticationService, private router: Router) {
  };

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isLogged()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isLogged()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

}
