import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastService} from "angular-toastify";
import {User} from "../../model/user";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnDestroy{

  currentUser: User | undefined

  subscriptions: Subscription = new Subscription();

  constructor(
    private authenticationService: AuthenticationService,
    private modalService: NgbModal,
    private toastService: ToastService) {
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  openModal(registerClientModal: TemplateRef<any>): void {
    this.modalService.open(registerClientModal);
  }

  loginUser(user: User): void {
    this.subscriptions.add(
    this.authenticationService.login(user)
      .subscribe(()=>{
        this.toastService.success("Login was successful!")
        this.currentUser = user;
      }))
  }
}
