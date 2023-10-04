import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {AuthenticationService} from "../../../services/authentication.service";

export const adminGuard: CanActivateFn = (route, state) => {
  return inject(AuthenticationService).getUserRole() === 'ADMINISTRATOR';
};
