import {Component, TemplateRef} from '@angular/core';
import {User} from "../../model/user";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastService} from "angular-toastify";

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent {

  currentUser: User | undefined

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private modalService: NgbModal,
    private toastService: ToastService) {
  }

  openModal(registerClientModal: TemplateRef<any>): void {
    this.modalService.open(registerClientModal);
  }

  registerUser(user: User): void {
    this.authenticationService.register(user)
      .subscribe(() => {
        this.toastService.success("User account was successfully created!")
      })
  }
}
