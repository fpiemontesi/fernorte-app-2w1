import { Component, Input } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { PaymentMethodService } from '../../services/payment-method.service';
import { payDetailDTO } from '../../models/payDetailDTO';
import { requestInvoiceDto } from '../../models/requestInvoiceDTO';
import { OrderService } from '../../services/order.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { paymentMethodDTO } from '../../models/paymentMethodDTO';

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

  constructor(
    private formBuilder: FormBuilder,
    private paymentMethodService: PaymentMethodService
  ) {
    this.paymentMethodDtos = this.paymentMethodService.obtenerFormasPago();
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
      const formData = this.formulario.value;
      console.log(formData);
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
