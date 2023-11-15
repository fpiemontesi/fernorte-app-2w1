import { Component, ViewChild, ElementRef } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DolarServiceService } from '../../services/dolar.service';
import { Dolar } from '../../models/Dolar';
import { Order } from '../../models/order';
import { PaymentsMethodsModalComponent } from '../payments-methods-modal/payments-methods-modal.component';
import { ToastService } from '../../services/toast.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'fn-home-invoice',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  dolar?: number;
  orden: Order = new Order();

  private subscription = new Subscription();

  constructor(
    private dolarService: DolarServiceService,
    private toastService: ToastService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    const dolar = this.dolarService.obtenerDolar();
    
    this.subscription.add(
      dolar.subscribe({
        next: (dol: Dolar) => {
          this.dolar = dol.venta; // Asignar el valor de compra del objeto Dolar
        },
        error: () => {
          this.toastService.show('Error al obtener el valor del Dolar', {
            classname: 'bg-danger text-light',
            delay: 15000,
          });
        },
      })
      );
    }

  activeIndex: number = 0; //

  items = [
    { text: 'Consulta Pedidos' },
    { text: 'Registrar Factura' },
    { text: 'Gestionar Facturas' },
  ];

  setActive(index: number) {
    this.activeIndex = index;
  }
  selectedOrder(order: Order) {
    this.orden = order;
    console.log('BORRAR', order);
    this.activeIndex = 1;
  }
  modalPaymentMethod() {
    const modalRef = this.modalService.open(PaymentsMethodsModalComponent, {
      size: 'lg',
    });
  }
}
