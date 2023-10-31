import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Receipt } from '../../../models/remito';
import { ReceiptDetail } from '../../../models/detalle-remito';
import { RemitoService } from '../../../services/remito.service';
import { Subscription } from 'rxjs';

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

  constructor(private remitoService: RemitoService){}

  addReceipt(form: NgForm) {
    if(form.invalid){
      alert('Form invalid');
      //Toast pending...
      return;
    }
    this.remitoService.create(this.receipt).subscribe({
      next: (response: Receipt) => {
        this.receipts.push(response);
        this.receipt.arrivalDate=new Date();
        this.receipt.purchaseOrderNumber=0;
        this.receipt.receiptNumber=0;
        this.receipt.supplierName="";
        //Toast pending...
        alert('Success')
      },
      error: (err) => {
        //Toast pending...
        console.log(err);
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
     //Toast pending...
     alert('Details are invalid')
    }
  }

  deleteDetail(index: number) {
    this.receipt.details.splice(index, 1);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}