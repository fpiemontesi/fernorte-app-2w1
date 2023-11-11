import { Component, Input } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { PaymentMethodService } from '../../services/payment-method.service';
import { payDetailDTO } from '../../models/payDetailDTO';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { paymentMethodDTO } from '../../models/paymentMethodDTO';
import { Invoice } from '../../models/Invoice';
import { SharedDataInvoiceService } from '../../services/shared-data-invoice.service';

@Component({
  selector: 'fn-registrar-pago',
  templateUrl: './registrar-pago.component.html',
  styleUrls: ['./registrar-pago.component.css'],
})
export class RegistrarPagoComponent {
  @Input() invoiceTotal: number = 0;
  public montoTotal: number = 0;
  listPays: payDetailDTO[] = [];
  paymentMethodDtos: Observable<paymentMethodDTO[]>;
  formulario: FormGroup;

  //COMO EL PROCESO FINALIZA UNA VEZ QUE PAGAMOS, HAGO EL POST DESDE ESTE COMPONETNE
  invoice:Invoice = new Invoice();

  constructor(
    private formBuilder: FormBuilder,
    private paymentMethodService: PaymentMethodService,
    private sharedDataInvoice:SharedDataInvoiceService,
    private invoiceService:InvoiceService
  ) {
    this.paymentMethodDtos = this.paymentMethodService.obtenerFormasPago();
    this.paymentMethodDtos.subscribe((data)=> {
      console.log(data)
    })
    this.formulario = this.formBuilder.group({
      paymentMethodList: this.formBuilder.array([]),
    });
    //Inicializa el form con una forma de pago por defecto
    this.agregarFormaDePago();
  }
  
  agregarFormaDePago() {
    const formaDePago = this.formBuilder.group({
      paymentMethod: '',
      amount: 0,
      observations: '',
    });
    this.paymentMethodList.push(formaDePago);
  }

  eliminarFormaDePago(index: number) {
    this.paymentMethodList.removeAt(index);
  }

  get paymentMethodList() {
    return this.formulario.get('paymentMethodList') as FormArray;
  }

  onSubmit() {
    if (this.formulario.valid) {
      const paymentsMethods = this.formulario.value.paymentMethodList[0];
      this.sharedDataInvoice.formData$.subscribe((invoiceData) => {
        this.invoice = invoiceData
      })

      this.invoice.paymentMethodList = [paymentsMethods];
      console.log(this.invoice)
      this.invoiceService.createInvoice(this.invoice).subscribe({
        next:(response) => {
          console.log(response)
          alert('se creo pa')
        },
        error:(error) => {
          console.log(error)
        }
      })


    }
  }
  calcularTotal() {
    this.montoTotal = 0;
    for (const formaDePago of this.paymentMethodList.controls) {
      this.montoTotal += formaDePago.value.amount;
    }
    console.log(this.montoTotal);
  }

}
