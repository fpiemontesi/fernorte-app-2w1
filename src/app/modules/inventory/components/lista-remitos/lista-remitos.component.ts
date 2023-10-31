import { Component, OnInit } from '@angular/core';
import { receipt } from '../../models/remito';
import { ReceiptService } from '../../services/remito.service';
import { Subscription } from 'rxjs';
import { receiptDetail } from '../../models/detalle-remito';

@Component({
  selector: 'fn-lista-remitos',
  templateUrl: './lista-remitos.component.html',
  styleUrls: ['./lista-remitos.component.css']
})
export class ReceiptListComponent implements OnInit {
  receipts: receipt[] = [];
  startDate: Date;
  endDate: Date;
  filteredReceipts: receipt[] = [];
  private subscription = new Subscription();

  constructor(private receiptService: ReceiptService) {
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

  private loadReceipts() {
    this.subscription.add(
      this.receiptService.getReceipts().subscribe({
        next: (receiptsResponse: receipt[]) => {
          this.receipts = receiptsResponse;
          this.filteredReceipts = receiptsResponse;
        }
      })
    );
  }
}