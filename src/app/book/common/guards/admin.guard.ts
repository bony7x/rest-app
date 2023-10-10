import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {inject} from "@angular/core";
import {AuthenticationService} from "../../../services/authentication.service";

export const adminGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  if( inject(AuthenticationService).getUserRole() === 'ADMINISTRATOR'){
    return true;
  } else {
    inject(Router).navigate(['dashboard']);
    return false;
  }
};
