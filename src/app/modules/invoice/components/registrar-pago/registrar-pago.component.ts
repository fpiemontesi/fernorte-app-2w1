import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Payment } from '../../models/payment';
import { InvoiceService } from '../../services/invoice.service';
import { PaymentMethodService } from '../../services/payment-method.service';
import { payDetailDTO } from '../../models/payDetailDTO';


@Component({
  selector: 'fn-registrar-pago',
  templateUrl: './registrar-pago.component.html',
  styleUrls: ['./registrar-pago.component.css'],
})
export class RegistrarPagoComponent {

  @Input() invoiceTotal : number = 10000; //viene de ventas. test funcionalidad componente
  @Input() remainPayment : number = 0;
  @Input() payment: Payment = {} as Payment;
  listPays: payDetailDTO[] = [];


  @Input() show: boolean = false; //no implementado, no funciona

  constructor(private modalService : NgbModal, private servinv: InvoiceService, private payserv: PaymentMethodService) { }

  ngOnInit() {
    this.remainPayment = this.invoiceTotal;
  }

  deletePay(pay: payDetailDTO) {
    const index = this.listPays.indexOf(pay);
    if (index !== -1) {
      this.listPays.splice(index, 1);
      this.remainPayment = this.invoiceTotal - this.listPays.reduce((total, pay) => total + (pay.amount || 0), 0);
      this.payserv.setListPaids(this.listPays);
    }
  }
  

  openModal(content: any) {
		this.invoiceTotal = this.servinv.getTotalpay();
    this.remainPayment = this.invoiceTotal;
    this.modalService.open(content, { size: 'xl', backdrop: 'static', keyboard: false, scrollable: true } );
	}

  actualizarRestante(resto : number) {
    this.remainPayment = resto;
    this.listPays = this.payserv.getListPaids();
  }
  closeModal(content:any){
    console.log(this.remainPayment)
    if(this.remainPayment<=this.invoiceTotal){
      alert("Payments Insufficient")
    }
    else{
      this.modalService.dismissAll();
    }
  }
}
