import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Payment } from '../../models/payment';


@Component({
  selector: 'fn-registrar-pago',
  templateUrl: './registrar-pago.component.html',
  styleUrls: ['./registrar-pago.component.css'],
})
export class RegistrarPagoComponent {

  @Input() invoiceTotal : number = 10000; //viene de ventas. test funcionalidad componente
  @Input() remainPayment : number = 0;
  @Input() payment: Payment = {} as Payment;


  @Input() show: boolean = false; //no implementado, no funciona

  constructor(private modalService : NgbModal) { }

  ngOnInit() {
    this.remainPayment = this.invoiceTotal;
  }

  openModal(content: any) {
		this.modalService.open(content, { size: 'xl', backdrop: 'static', keyboard: false, scrollable: true } );
	}

  actualizarRestante(resto : number) {
    this.remainPayment = resto;
  }
}
