import {Component} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-confirm-deletion-modal',
  templateUrl: './confirm-deletion-modal.component.html',
  styleUrls: ['./confirm-deletion-modal.component.css']
})
export class ConfirmDeletionModalComponent {

  constructor(private activeModal: NgbActiveModal) {
  }

  confirmDeletion(result: boolean): void {
    this.activeModal.close(result);
  }
}
