import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {AuthenticationService} from "../../../services/authentication.service";

export const userGuard: CanActivateFn = (route, state) => {
  return inject(AuthenticationService).getUserRole() === 'USER' || inject(AuthenticationService).getUserRole() === 'CUSTOMER' || inject(AuthenticationService).getUserRole() === 'ADMINISTRATOR';
};
