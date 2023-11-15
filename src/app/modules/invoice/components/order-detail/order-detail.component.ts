import { Component } from '@angular/core';
import { Order } from '../../models/order';
import { SharedOrdenDetailService } from '../../services/shared-orden-detail.service';

@Component({
  selector: 'fn-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent {

  order:Order = new Order();
  orderDetailPresent:boolean = false;

  constructor(private sharedOrderDetail:SharedOrdenDetailService){
    
  }

  closeModal(){
    this.orderDetailPresent = false
  }

  ngOnInit(){
    this.sharedOrderDetail.OrderData$.subscribe((orderDetail)=>
    {
      this.order = orderDetail
      this.orderDetailPresent = true;
      console.log(this.order.detalles)
    })  

  }
}
