import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Receipt} from "../../../models/receipt";
import {ReceiptService} from "../../../services/remito.service";

@Component({
  selector: 'fn-receipt-details-modal',
  templateUrl: './receipt-details-modal.component.html',
  styleUrls: ['./receipt-details-modal.component.css']
})
export class ReceiptDetailsModalComponent implements OnInit{
  receipt: Receipt = new Receipt();

  constructor(public activeModal: NgbActiveModal, private receiptService: ReceiptService) {
  }

  ngOnInit(): void {
    this.receipt = this.receiptService.selectedReceipt;
  }
}
