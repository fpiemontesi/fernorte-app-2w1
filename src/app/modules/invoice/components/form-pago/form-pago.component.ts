import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaymentMethodService } from '../../services/payment-method.service';
import { ToastService } from '../../services/toast.service';
import { Subscription } from 'rxjs';
import { PaymentMethodDTO } from '../../models/payment-method-dto';
import { PayDetailDTO } from '../../models/pay-detail-dto';

@Component({
  selector: 'fn-form-pago',
  templateUrl: './form-pago.component.html',
  styleUrls: ['./form-pago.component.css'],
})
export class FormPagoComponent {
  //listado de las formas de pago
  listTypePayment: PaymentMethodDTO[] = [];
  //objeto metodo de pago elegido
  selectedPayment?: PaymentMethodDTO;
  //lista de los pagos guardados completos
  listPaids: PayDetailDTO[] = [];
  //un solo pago realizado que se adiciona a la lista
  pay: PayDetailDTO = new PayDetailDTO();

  resto: number = 0;
  @Input() total: number = 0;

  @Output() restoEmit: EventEmitter<number> = new EventEmitter<number>();

  private subscription = new Subscription();

  constructor(
    private formasPagoService: PaymentMethodService,
    private paidservice: PaymentMethodService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    const listTP = this.formasPagoService.obtenerFormasPago();

    this.subscription.add(
      listTP.subscribe({
        next: (response: PaymentMethodDTO[]) => {
          this.listTypePayment = response;
        },
        error: () => {
          this.toastService.show('Error al obtener las formas de pago', {
            classname: 'bg-danger text-light',
            delay: 15000,
          });
        },
      })
    );

    this.resto = this.total;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // agrega pagos a la lista de pagos

  addPay() {
    const newPay = new PayDetailDTO();

    if (this.validatePay(this.pay.amount)) {
      newPay.amount = this.pay.amount;
      newPay.paymentMethod = this.selectedPayment?.id;
      newPay.paymentMethodDescription = this.selectedPayment?.name;
      newPay.observations = this.pay.observations;

      this.listPaids.push(newPay);
      this.paidservice.setListPaids(this.listPaids);
      console.log(this.paidservice.getListPaids());
      this.pay = new PayDetailDTO();
      this.resto = this.resto - newPay.amount!;
      this.paidservice.setListPaids(this.listPaids);
      this.restoEmit.emit(this.resto);
    } else {
    }
  }
  validatePay(monto: number) {
    const metodoUtilizado = this.listPaids.find(
      (p) => p.paymentMethodDescription === this.selectedPayment?.name
    );

    if (monto > this.resto) {
      alert('El monto supera el total');
      return false;
    } else if (monto === 0) {
      alert('No se puede ingresar un valor de 0');
      return false;
    } else if (this.selectedPayment === undefined) {
      alert('Ingrese metodo de pago');
      return false;
    } else if (metodoUtilizado !== undefined) {
      alert('Ya eligio esa forma de pago');
      return false;
    } else {
      return true;
    }
  }
}
