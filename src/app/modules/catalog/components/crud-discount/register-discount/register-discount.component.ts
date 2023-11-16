import { Component, OnDestroy, OnInit } from '@angular/core';
import { Discount } from '../../../models/discount';
import { Observable, Subscription } from 'rxjs';
import { DiscountService } from '../../../services/discountService/discount.service';
import { Router } from '@angular/router';
import { productService } from '../../../services/productService/product.service';
import { Producto } from '../../../models/producto';

@Component({
  selector: 'fn-register-discount',
  templateUrl: './register-discount.component.html',
  styleUrls: ['./register-discount.component.css']
})
export class RegisterDiscountComponent implements OnDestroy,OnInit {
  discount:Discount = {} as Discount;
  lstProductos:Producto[] = []
  alert:boolean = false;
  private subscription = new Subscription();
  constructor(private discountService:DiscountService, private router:Router, private pService:productService){}

  ngOnInit(): void {
    this.pService.getAllProducts().subscribe({
      next: (data : Producto[]) =>{
        data.forEach(e => {
          if(e.activo==true){
            this.lstProductos.push(e)
          }
        })

      },
      error: () => {
        alert("error")
      }
    })
  }
  
  cleanForm(){
    this.discount = {} as Discount
    this.router.navigate(["/listDiscounts"])
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()

  }

  agregarMarca(){
    this.subscription.add(
      this.discountService.create(this.discount).subscribe({
        next: async (discount:Discount)=>{
          await this.toggleAlert()
          this.discount = {} as Discount
          this.router.navigate(["listDiscounts"])
        },
        error:()=>{
          alert("Ocurrio un error")
        }
      })
    )
  }

  toggleAlert(): Promise<void> {
    this.alert = !this.alert;

    if (this.alert) {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.alert = false;
          resolve();
        }, 5000);
      });
    } else {
      return Promise.resolve();
    }
  }

}
