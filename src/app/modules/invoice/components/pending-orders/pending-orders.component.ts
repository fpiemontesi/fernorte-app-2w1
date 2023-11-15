import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order';
import { Detail } from '../../models/Detail';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { Subscription } from 'rxjs';
import { SharedOrdenDetailService } from '../../services/shared-orden-detail.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailsModalComponent } from '../details-modal/details-modal.component';
import { OrderDetailComponent } from '../order-detail/order-detail.component';

@Component({
  selector: 'fn-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.css'],
})
export class PendingOrdersComponent implements OnInit {
  //one to load with the items to shows according the case
  ordersToShow: Order[] = [];
  //one to use load when a search is done
  pedidosFiltrados: Order[] = [];
  //one to load with all data
  orders: Order[] = [];
  SelectedDetails: Detail[] = [];

  isModalOpen: boolean = false;

  private subscription = new Subscription();

  constructor(
    private orderService: OrderService,
    private toastService: ToastService,
    private route: Router,
    private sharedDataOrder:SharedOrdenDetailService,
    private modalService: NgbModal,
  ) {}
  
  ngOnInit(): void {
    const listOrders = this.orderService.obtenerOrdenes();

    this.subscription.add(
      listOrders.subscribe({
        next: (response: Order[]) => {
          this.orders = response;
          this.ordersToShow = this.orders;
        },
        error: () => {
          this.toastService.show('Error al obtener las ordenes', {
            classname: 'bg-danger text-light',
            delay: 15000,
          });
        },
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  buscarPedidos(event: any): void {
    const termino = event.target.value;
    if (termino !== '') {
      this.pedidosFiltrados = this.orders.filter((order) => {
        return order.id.toString().includes(termino);
      });
      this.ordersToShow = this.pedidosFiltrados;
    } else {
      this.ordersToShow = this.orders;
    }
  }

  obtenerDetalles(order: Order): void {
    this.calculateSubtotal();
    this.modalService.open(OrderDetailComponent, {
      size: 'lg',
    });
    this.sharedDataOrder.setInvoiceData(order)
   

  }


  calculateSubtotal(): void {
    if (this.SelectedDetails.length > 0) {
      this.SelectedDetails.forEach((detail) => {
        detail.subtotal = detail.cantidad * detail.precio_unitario;
      });
    }
  }
  //guardamos la orden en el servicio order
  facturarOrden(order: Order) {
    console.log(order);
    this.orderService.setOrderSelected(order);
    this.route.navigate(['ConsultarPedidos/RegistrarFactura/' + order.id]);
  }
}
