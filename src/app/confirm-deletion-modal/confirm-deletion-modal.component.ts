import {Component, TemplateRef} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-confirm-deletion-modal',
  templateUrl: './confirm-deletion-modal.component.html',
  styleUrls: ['./confirm-deletion-modal.component.css']
})
export class ConfirmDeletionModalComponent {

  constructor(private modalService: NgbModal) {
  }

  openModal(confirmDeletionModal: TemplateRef<any>): void {
    this.modalService.open(confirmDeletionModal)
  }

  protected readonly open = open;
}
