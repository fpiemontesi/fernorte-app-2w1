import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaymentMethodService } from '../../services/payment-method.service';
import { paymentMethodDTO } from '../../models/paymentMethodDTO';
import { payDetailDTO } from '../../models/payDetailDTO';

@Component({
  selector: 'fn-form-pago',
  templateUrl: './form-pago.component.html',
  styleUrls: ['./form-pago.component.css']
})
export class FormPagoComponent {


  //listado de las formas de pago 
  listTypePayment: paymentMethodDTO[] = [];
  //objeto metodo de pago elegido
  selectedPayment?: paymentMethodDTO;
  //lista de los pagos guardados completos
  listPaids: payDetailDTO[] = [];
  //un solo pago realizado que se adiciona a la lista
  pay: payDetailDTO = new payDetailDTO();


  resto: number = 0;
  @Input() total: number = 0;

  @Output() restoEmit: EventEmitter<number> = new EventEmitter<number>();


  constructor(private formasPagoService: PaymentMethodService, private paidservice: PaymentMethodService) {
    formasPagoService.obtenerFormasPago().subscribe((response: paymentMethodDTO[]) => {
      this.listTypePayment = response;
    },
      (error: any) => {
        console.error(error);
      }
    );
  }

  // agrega pagos a la lista de pagos

  addPay() {
    const newPay = new payDetailDTO();

    if (this.validatePay(this.pay.amount)) {

      newPay.amount = this.pay.amount;
      newPay.paymentMethod = this.selectedPayment?.id;
      newPay.paymentMethodDescription = this.selectedPayment?.name;
      newPay.observations = this.pay.observations


      this.listPaids.push(newPay);
      this.paidservice.setListPaids(this.listPaids);
      console.log(this.paidservice.getListPaids());
      this.pay = new payDetailDTO();
      this.resto = this.resto - newPay.amount!;
      this.paidservice.setListPaids(this.listPaids);
      this.restoEmit.emit(this.resto);
    }
    else {
   
    }


  }
  validatePay(monto: number) {
    const metodoUtilizado = this.listPaids.find(p => p.paymentMethodDescription === this.selectedPayment?.name);

    if (monto > this.resto) {
      alert("El monto supera el total.");
      return false;
    } else if (monto === 0) {
      alert("No se puede ingresar un valor de 0.");
      return false;
    } else if (this.selectedPayment === undefined) {
      alert("Ingrese metodo de pago");
      return false;
    } else if (metodoUtilizado !== undefined) {
      alert("Ya eligio esa forma de pago");
      return false;
    }
    else {
      return true;
    }
  }



  ngOnInit() {

    this.resto = this.total;
  }











}