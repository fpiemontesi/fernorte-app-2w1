import { Component, Input } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { PaymentMethodService } from '../../services/payment-method.service';
import { PayDetailDTO } from '../../models/PayDetailDTO';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { PaymentMethodDTO } from '../../models/PaymentMethodDTO';
import { Invoice } from '../../models/Invoice';
import { SharedDataInvoiceService } from '../../services/shared-data-invoice.service';
import { Customvalidator } from '../validators/customvalidator';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'fn-registrar-pago',
  templateUrl: './registrar-pago.component.html',
  styleUrls: ['./registrar-pago.component.css'],
})
export class RegistrarPagoComponent {
  @Input() invoiceTotal: number = 0;
  public montoTotal: number = 0;
  listPays: PayDetailDTO[] = [];
  paymentMethodDTOs: Observable<PaymentMethodDTO[]> | undefined;
  formulario: FormGroup;
  paymentMethodCount: number = 0;
  restanteTotal: number = 0;


  constructor(
    private formBuilder: FormBuilder,
    private paymentMethodService: PaymentMethodService,
    private sharedDataInvoice: SharedDataInvoiceService,
    private invoiceService: InvoiceService,
    public activeModal: NgbActiveModal,
    private toastService: ToastService
  ) {
    this.paymentMethodDTOs = this.paymentMethodService.obtenerFormasPago();
    this.formulario = this.formBuilder.group({
      paymentMethodList: this.formBuilder.array([]),
    });

    paymentMethodService.obtenerFormasPago().subscribe((data) => this.paymentMethodCount = data.length);

    this.agregarFormaDePago();
  }

  close() {
    this.activeModal.close();
  }
  agregarFormaDePago() {
    const formaDePago = this.formBuilder.group({
      paymentMethod: ['', [Validators.required]],
      amount: [
        '',
        [
          Validators.required,
          Validators.min(0),
          Customvalidator.maxAmountValidator(this.restanteTotal),
        ],
      ],
      observations: '',
    });

    if (
      this.paymentMethodList.length < this.paymentMethodCount ||
      this.paymentMethodList.length === 0
    ) {
      this.paymentMethodList.push(formaDePago);
    } else {
      this.toastService.show('Ya se ha alcanzado el maximo de formas de pago', {
        classname: 'bg-danger text-light',
        delay: 3000,
      })
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
      if(this.restanteTotal > 0){
        this.toastService.show('No se ha cubierto todo el monto', {
          classname: 'bg-danger text-light',
          delay: 3000,
        })
        return;
      }else{
      const paymentMethods = this.formulario.value.paymentMethodList.flatMap(
        (payment: any) => payment
      );
      this.sharedDataInvoice.setInvoicePayments(paymentMethods);
      this.close();
      }
    } else {
      this.toastService.show('Error al registrar el pago, revise los campos', {
        classname: 'bg-danger text-light',
        delay: 3000,
      })
    }
  }

  calcularTotal(index: number) {
    this.montoTotal = 0;
    this.restanteTotal = this.invoiceTotal; // Restablecer el restante total

    for (const formaDePago of this.paymentMethodList.controls) {
      this.montoTotal += formaDePago.value.amount;
    }

    this.restanteTotal -= this.montoTotal; // Actualizar el restante con el monto actual

    for (let i = 0; i < this.paymentMethodList.length; i++) {
      const amountControl = this.paymentMethodList.at(i).get('amount');
      amountControl?.setValidators([
        Validators.required,
        Validators.min(0),
        Customvalidator.maxAmountValidator(this.restanteTotal),
      ]);
      amountControl?.updateValueAndValidity();
      amountControl?.markAsTouched();
    }

    this.formulario.updateValueAndValidity(); // Actualizar validación del formulario
  }
  setTotal() {
    this.paymentMethodList.controls.forEach((formaDePago) => {
      if(this.restanteTotal>0){
        formaDePago.get('amount')?.setValue(this.restanteTotal);
      }else
        formaDePago.get('amount')?.setValue(this.montoTotal);
    });
  }
}
