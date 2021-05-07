import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  closeResult: string;

  constructor(private modalService: NgbModal) {}

  openModal(content: string) {
    this.modalService.open(content);
  }
}
