import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InvoiceService } from '../../services/invoice.service';
import { PaymentMethodService } from '../../services/payment-method.service';
import { payDetailDTO } from '../../models/payDetailDTO';


@Component({
  selector: 'fn-registrar-pago',
  templateUrl: './registrar-pago.component.html',
  styleUrls: ['./registrar-pago.component.css'],
})
export class RegistrarPagoComponent {

  @Input() invoiceTotal: number = 10000; //viene de ventas. test funcionalidad componente
  @Input() resto: number = 0;
  //lista de los pagos que se hicieron
  listPays: payDetailDTO[] = [];


  constructor(private modalService: NgbModal, private servinvoice: InvoiceService, private payserv: PaymentMethodService) { }

  ngOnInit() {
    this.resto = this.invoiceTotal;
    this.payserv.getPaidsObservable().subscribe((pays) => {
      this.listPays = pays;
    });
  
  }


  deletePay(pay: payDetailDTO) {
    const index = this.listPays.indexOf(pay);
    if (index !== -1) {
      this.listPays.splice(index, 1);
      this.resto = this.invoiceTotal - this.listPays.reduce((total, pay) => total + (pay.amount || 0), 0);
      this.payserv.setListPaids(this.listPays);
    }
  }


  //abre el modal para agregar pagos
  openModal(content: any) {
    //cargamos la variable invoiceTotal con el total a pagar a traves del servicio de factura y seteamos el resto igual
    this.invoiceTotal = this.servinvoice.getTotalpay();
    this.resto = this.invoiceTotal;
    this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false, scrollable: true });
  }
  //toma el resto del hijo y lo guarda en el padre
  guardarResto(resto: any) {
    this.resto = resto;
    this.listPays = this.payserv.getListPaids();
  }
  //finaliza todos los pagos
  endPays(content: any) {
    if (this.resto > 0) {
      alert("Pagos insuficientes")
    }
    else {
      alert("Pagos totales ingresados")
      this.modalService.dismissAll();
    }
  }
}
