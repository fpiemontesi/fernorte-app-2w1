import { Component } from '@angular/core';
import { Discount } from '../../../models/discount';
import { Subscription } from 'rxjs';
import { DiscountService } from '../../../services/discountService/discount.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../../../models/producto';
import { productService } from '../../../services/productService/product.service';

@Component({
  selector: 'fn-update-discount',
  templateUrl: './update-discount.component.html',
  styleUrls: ['./update-discount.component.css']
})
export class UpdateDiscountComponent {
  discount:Discount = {} as Discount;
  lstProductos:Producto[] = []
  codeDiscountSelected:string = "";
  alert:boolean = false
  private subscription = new Subscription();


  constructor(private discountService:DiscountService, private activatedRoute: ActivatedRoute, private route:Router,private pService:productService){
  }

  ngOnInit(): void {
    this.subscription.add(
      this.activatedRoute.queryParams.subscribe(params => {
        this.codeDiscountSelected = params["codigo"];
      }),
    )
    this.subscription.add(
      this.discountService.getByCode(this.codeDiscountSelected).subscribe(
        (response:Discount)=>{
          this.discount=response;
        }),
    )
    this.subscription.add(
      this.pService.getAllProducts().subscribe({
        next: (data:Producto[])=>{
          this.lstProductos = data;
        },
        error:() => {
          alert("error")
        }
      }),
      
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  editarDiscount(){
    this.subscription.add(
        this.discountService.update(this.discount).subscribe({
          next: async (discount:Discount)=>{
            await this.toggleAlert()
            this.discount = {} as Discount
            this.route.navigate(["/listDiscounts"])
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
