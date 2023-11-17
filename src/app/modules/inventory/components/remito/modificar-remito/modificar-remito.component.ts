import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RemitoService } from '../../../services/remito.service';
import { Receipt } from '../../../models/receipt';
import { Subscription } from 'rxjs';
import { AppToastService } from '../../../services/app-toast.service';
import { ReceiptDetail } from '../../../models/receipt-detail';

@Component({
  selector: 'fn-modificar-remito',
  templateUrl: './modificar-remito.component.html',
  styleUrls: ['./modificar-remito.component.css']
})
export class ModificarRemitoComponent implements OnInit, OnDestroy {
  receiptForm: FormGroup = new FormGroup({});
  receipt: Receipt = new Receipt();
  receiptDetails: ReceiptDetail[] = [];
  private receiptSubscription: Subscription = new Subscription();

  constructor(private toastService: AppToastService,private formBuilder: FormBuilder, private remitoService: RemitoService) {}

  ngOnInit() {
    this.receiptForm = this.formBuilder.group({
      arrivalDate: [null, Validators.required],
      purchaseOrderNumber: [null, Validators.required],
      receiptNumber: [null, Validators.required],
      supplierName: [null, Validators.required],
      productName: [''],
      quantity: [null],
      detail: ['']
    });

    this.receiptSubscription = this.remitoService.getById(1).subscribe((data: Receipt) => {
      this.receipt = data || new Receipt();
      this.loadReceiptData();
    });
  }

  loadReceiptData() {
    this.receiptForm.patchValue({
      arrivalDate: this.receipt.arrivalDate,
      purchaseOrderNumber: this.receipt.purchaseOrderNumber,
      receiptNumber: this.receipt.receiptNumber,
      supplierName: this.receipt.supplierName
    });
    this.receiptDetails = this.receipt.details;
  }

  addReceiptDetail() {
    const newReceiptDetail: ReceiptDetail = {
      id: 0,
      productName: this.receiptForm.get('productName')?.value,
      quantity: this.receiptForm.get('quantity')?.value,
      detail: this.receiptForm.get('detail')?.value
    };
    this.receiptDetails.push(newReceiptDetail);
    this.receiptForm.get('productName')?.reset();
    this.receiptForm.get('quantity')?.reset();
    this.receiptForm.get('detail')?.reset();
  }

  updateReceipt() {
    if (this.receiptForm.valid) {
      this.receipt.arrivalDate = this.receiptForm.get('arrivalDate')?.value;
      this.receipt.purchaseOrderNumber = this.receiptForm.get('purchaseOrderNumber')?.value;
      this.receipt.receiptNumber = this.receiptForm.get('receiptNumber')?.value;
      this.receipt.supplierName = this.receiptForm.get('supplierName')?.value;
      this.receipt.details = this.receiptDetails;

      this.receiptSubscription = this.remitoService.modify(this.receipt).subscribe((updatedReceipt: Receipt) => {
        this.toastService.show("Formulario valido","Remito modificado con exito.");      });
    } else {
      this.toastService.show("Formulario invalido","Datos del formulario invalidos");
    }
  }

  ngOnDestroy() {
    if (this.receiptSubscription) {
      this.receiptSubscription.unsubscribe();
    }
  }

  deleteDetail(index: number) {
    this.receiptDetails.splice(index, 1);
  }
  
}
