import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaymentMethodService } from '../../services/payment-method.service';
import { PaymentMethod } from '../../models/payment-method';
import { Payment } from '../../models/payment';
import { PmDTO } from '../../models/pm-dto';
import { paymentMethodDTO } from '../../models/paymentMethodDTO';
import { payDetailDTO } from '../../models/payDetailDTO';

@Component({
  selector: 'fn-form-pago',
  templateUrl: './form-pago.component.html',
  styleUrls: ['./form-pago.component.css']
})
export class FormPagoComponent {

  listMethods: PaymentMethod[] = []; //idFormaPago, FormaPago
  payment: Payment = {} as Payment; //idPago, idDetalleFormaPago, observaciones, total
  listpmDTO: PmDTO[] = []; //DetalleFormaPago
  paymentMethodDTO: PmDTO = {} as PmDTO; //idDetalleFormaPago, idPago, idFormaPago, subtotalFormaPago
  listaPayment: Payment[] = [];




  listTypePayment: paymentMethodDTO[] = [];

  listPaids: payDetailDTO[] = [];
  pay: payDetailDTO = new payDetailDTO();


  @Input() resto: number = 0;
  @Input() total: number = 0;
  @Output() onCalcularRestante = new EventEmitter<number>();

  constructor(private formasPagoService: PaymentMethodService, private paidservice: PaymentMethodService) {
    formasPagoService.obtenerFormasPago().subscribe((response: paymentMethodDTO[]) => {
      this.listTypePayment = response;
    },
      (error: any) => {
        console.error(error);
      }
    );
  }


  addPay() {
  const newPay = new payDetailDTO();
 
  newPay.amount  = this.pay.amount; 
  newPay.paymentMethod = this.pay.paymentMethod; 
  newPay.observations = this.pay.observations

  this.listPaids.push(newPay);
  this.paidservice.setListPaids(this.listPaids);
  console.log(this.paidservice.getListPaids());
  this.pay = new payDetailDTO(); 
  this.resto = this.resto - newPay.amount!;
  this.onCalcularRestante.emit(this.resto);
  }

 






  ngOnInit() {
    this.listMethods = this.formasPagoService.listarFormas();
    this.resto = this.total;
  }












  addMethod() {

    if (this.resto != 0 && this.paymentMethodDTO.subtotalMethod <= this.resto && this.paymentMethodDTO.subtotalMethod <= this.total) {

      this.listpmDTO.push(this.paymentMethodDTO);
      this.calcularRestante();
      this.onCalcularRestante.emit(this.resto);
    }
    else {
      alert("Error al procesar el metodo de pago");
    }
    this.paymentMethodDTO = {} as PmDTO;
  }

  deleteMethod() {

    if (this.resto != 0 && this.listpmDTO.length != 0) {

      var lastDTO = this.listpmDTO.pop();
      this.resto = this.resto + lastDTO?.subtotalMethod!;
      this.onCalcularRestante.emit(this.resto);
    }
  }

  calcularRestante() {
    this.resto = this.resto - this.paymentMethodDTO.subtotalMethod;
  }

  enviarPago() {

    if (this.resto == 0) {
      this.payment.listPaymentMethodDTO = this.listpmDTO;
      this.payment.invoiceTotal = this.total;
      this.listaPayment.push(this.payment);
      console.log(this.listaPayment);
      alert("Pago completado");
    }
    else {
      alert("Error. Todavia hay restante a pagar");
    }
  }

  // cargarComboFormasPago() {

  // this.formasPagoService.get().subscribe({
  //   next: (comboFormas: PaymentMethod[]) => {
  //     this.listaFormas = comboFormas;
  //   },
  //   error: () => {
  //     alert('Error al cargar formas de pago');
  //   }
  // });
  // }

}
