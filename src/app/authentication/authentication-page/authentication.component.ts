import {Component, TemplateRef} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastService} from "angular-toastify";
import {User} from "../../model/user";

@Component({
  selector: 'app-authentification',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {

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

  loginUser(user: User): void {
    this.authenticationService.login(user)
      .subscribe(()=>{
        this.toastService.success("Login was successful!")
        this.currentUser = user;
      })
  }

  logoutUser(user: User): void{
    this.authenticationService.logout(user)
      .subscribe(()=>{
        this.toastService.success("Logout was successful!");
        this.currentUser = undefined;
      })
  }
}
