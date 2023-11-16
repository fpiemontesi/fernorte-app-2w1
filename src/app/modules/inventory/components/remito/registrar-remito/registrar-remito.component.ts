import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Receipt } from '../../../models/receipt';
import { ReceiptDetail } from '../../../models/receipt-detail';
import { ReceiptService } from '../../../services/remito.service';
import { Subscription } from 'rxjs';
import { AppToastService } from '../../../services/app-toast.service';

@Component({
  selector: 'fn-registrar-remito',
  templateUrl: './registrar-remito.component.html',
  styleUrls: ['./registrar-remito.component.css']
})
export class RegistrarRemitoComponent implements OnDestroy{
  receipts: Receipt[] = [];
  receipt: Receipt = new Receipt();
  detail: ReceiptDetail = new ReceiptDetail();
  private subscriptions = new Subscription();

  constructor(private remitoService: ReceiptService, private toastService: AppToastService){}

  addReceipt(form: NgForm) {
    if (form.invalid) {
      this.toastService.show("Formulario inválido", "El formulario insertado es inválido.");
      return;
    }
    this.remitoService.create(this.receipt).subscribe({
      next: (response: Receipt) => {
        this.receipts.push(response);
        this.receipt.arrivalDate=new Date();
        this.receipt.purchaseOrderNumber=0;
        this.receipt.receiptNumber=0;
        this.receipt.supplierName="";
        this.toastService.show("Formulario valido!","Remito fue registrado correctamente.");
      },
      error: (err) => {
        this.toastService.show("Error",err);
      }
    });
  }
  
  addReceiptDetail(form: NgForm) {
    if (form.valid) {
      const newDetail: ReceiptDetail = new ReceiptDetail();
      newDetail.quantity = this.detail.quantity;
      newDetail.productName = this.detail.productName;
      newDetail.detail = this.detail.detail;

      this.receipt.details.push(newDetail);
      this.detail = new ReceiptDetail(); 
    } else {
      this.toastService.show("Formulario invalido","Datos del detalle invalido.");
    }
  }

  deleteDetail(index: number) {
    this.receipt.details.splice(index, 1);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}