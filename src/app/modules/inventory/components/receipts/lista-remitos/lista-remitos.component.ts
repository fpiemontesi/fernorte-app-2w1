import { Component, OnInit } from '@angular/core';
import { Receipt } from '../../../models/receipt';
import { ReceiptService } from '../../../services/remito.service';
import { Subscription } from 'rxjs';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {ReceiptDetailsModalComponent} from "../receipt-details-modal/receipt-details-modal.component";

@Component({
  selector: 'fn-lista-remitos',
  templateUrl: './lista-remitos.component.html',
  styleUrls: ['./lista-remitos.component.css']
})
export class ReceiptListComponent implements OnInit {
  receipts: Receipt[] = [];
  startDate: Date;
  endDate: Date;
  filteredReceipts: Receipt[] = [];
  private subscription = new Subscription();

  constructor(private receiptService: ReceiptService, private modalService: NgbModal) {
    this.endDate = new Date();
    this.startDate = new Date();
  }

  ngOnInit(): void {
    this.loadReceipts();
  }

  modify(id: number) {}

  filter() {
    if (!this.startDate && !this.endDate) {
      this.filteredReceipts = this.receipts;
      return;
    }
    this.filteredReceipts = this.receipts.filter((receipt) => {
      const receiptDate = receipt.arrivalDate;
      return receiptDate >= this.startDate && receiptDate <= this.endDate;
    });
  }

  openModal(receiptIndex: number){
    const modalRef: NgbModalRef = this.modalService.open(ReceiptDetailsModalComponent, {size: 'xl',
      centered: true, scrollable: true});
    this.receiptService.selectedRecipt = this.filteredReceipts[receiptIndex];
  }

  private loadReceipts() {
    this.subscription.add(
      this.receiptService.getReceipts().subscribe({
        next: (receiptsResponse: Receipt[]) => {
          this.receipts = receiptsResponse;
          this.filteredReceipts = receiptsResponse;
        }
      })
    );
  }
}
