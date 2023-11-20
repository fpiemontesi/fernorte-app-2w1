import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentMethodService } from '../../services/payment-method.service';

import { ToastService } from '../../services/toast.service';
import { PaymentMethodDTO } from '../../models/payment-method-dto';


@Component({
  selector: 'fn-payments-methods-modal',
  templateUrl: './payments-methods-modal.component.html',
  styleUrls: ['./payments-methods-modal.component.css']
})
export class PaymentsMethodsModalComponent implements OnInit {

  formulario: FormGroup = new FormGroup({});
  constructor(    private formBuilder: FormBuilder,
    private paymentMethodService: PaymentMethodService,
    private toastService : ToastService,
    private modalService: NgbModal
    ){
  }
  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      name: '',
    });
  }
  close() {
    this.modalService.dismissAll();
  }

  onSubmit() {
    if (this.formulario.valid) {
      const paymentMethod: PaymentMethodDTO = this.formulario.value;
      this.paymentMethodService.addPay(paymentMethod).subscribe(
        (response) => {
          // Utiliza el toastService para mostrar un mensaje de éxito
          this.toastService.show('Forma de pago ' + response.name + ' registrada', { classname: 'bg-success text-light', delay: 10000 });
          this.formulario.reset();
        },
        (error) => {
          this.toastService.show('Error al registrar la forma de pago', { classname: 'bg-danger text-light', delay: 15000 });
        }
      );
    }
  }
  
}
