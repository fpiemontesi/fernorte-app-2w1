import { Component, Input } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { PaymentMethodService } from '../../services/payment-method.service';
import { payDetailDTO } from '../../models/payDetailDTO';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { PaymentMethodDTO } from '../../models/PaymentMethodDTO';
import { Invoice } from '../../models/Invoice';
import { SharedDataInvoiceService } from '../../services/shared-data-invoice.service';
import { Customvalidator } from '../validators/customvalidator';

@Component({
  selector: 'fn-registrar-pago',
  templateUrl: './registrar-pago.component.html',
  styleUrls: ['./registrar-pago.component.css'],
})
export class RegistrarPagoComponent {
  @Input() invoiceTotal: number = 0;
  public montoTotal: number = 0;
  listPays: PayDetailDTO[] = [];
  PaymentMethodDTOs: Observable<PaymentMethodDTO[]>;
  formulario: FormGroup;
  paymentMethodCount: number = 0;
  restanteTotal: number = 0;

  //COMO EL PROCESO FINALIZA UNA VEZ QUE PAGAMOS, HAGO EL POST DESDE ESTE COMPONETNE
  invoice: Invoice = new Invoice();

  constructor(
    private formBuilder: FormBuilder,
    private paymentMethodService: PaymentMethodService,
    private sharedDataInvoice: SharedDataInvoiceService,
    private invoiceService: InvoiceService
  ) {
    this.paymentMethodDtos = this.paymentMethodService.obtenerFormasPago();
    this.formulario = this.formBuilder.group({
      paymentMethodList: this.formBuilder.array([]),
    });

    this.agregarFormaDePago();
  }

  agregarFormaDePago() {
    const formaDePago = this.formBuilder.group({
      paymentMethod: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(0), Customvalidator.maxAmountValidator(this.restanteTotal)]],
      observations: '',
    });

    if (this.paymentMethodList.length < this.paymentMethodCount || this.paymentMethodList.length === 0) {

      this.paymentMethodList.push(formaDePago);
    }
    else {
      alert("NO HAY MAS FORMAS DE PAGO DISPONIBLES");
    }

  }

  eliminarFormaDePago(index: number) {
    this.paymentMethodList.removeAt(index);
  }


  get paymentMethodList() {
    return this.formulario.get('paymentMethodList') as FormArray;
  }


  onSubmit() {
    if (this.formulario.valid) {
      ///const paymentsMethods = this.formulario.value.paymentMethodList;
      const paymentMethods = this.formulario.value.paymentMethodList.flatMap((payment: any) => payment);

      this.sharedDataInvoice.formData$.subscribe((invoiceData) => {
        this.invoice = invoiceData
      })
      this.invoice.paymentMethodList = paymentMethods;
      console.log(this.invoice)
      this.invoiceService.createInvoice(this.invoice).subscribe({
        next: (response) => {
          console.log(response)
          alert('se creo pa')
        },
        error: (error) => {
          console.log(error)
          alert(error);
        }
      })


    }else{
      alert("FORM INVALIDO");
    }
    
  }


  calcularTotal(index: number) {
    this.montoTotal = 0;
    this.restanteTotal = this.invoiceTotal; // Restablecer el restante total

    for (const formaDePago of this.paymentMethodList.controls) {
      this.montoTotal += formaDePago.value.amount;
    }

    this.restanteTotal -= this.montoTotal; // Actualizar el restante con el monto actual
    console.log(this.restanteTotal);
    for (let i = 0; i < this.paymentMethodList.length; i++) {
      const amountControl = this.paymentMethodList.at(i).get('amount');
      amountControl?.setValidators([
        Validators.required,
        Validators.min(0),
        Customvalidator.maxAmountValidator(this.restanteTotal)
      ]);
      amountControl?.updateValueAndValidity();
      amountControl?.markAsTouched();
    }

    this.formulario.updateValueAndValidity(); // Actualizar validación del formulario
  }




  /*let restante = this.invoiceTotal - this.montoTotal;

  const amountControl = this.paymentMethodList.at(index).get('amount');

  amountControl?.setValidators([Validators.required, Validators.min(0), Customvalidator.maxAmountValidator(restante)]);
  amountControl?.updateValueAndValidity();*/





}
