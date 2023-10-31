import { Component } from '@angular/core';
import { Discount } from '../../../models/discount';
import { Subscription } from 'rxjs';
import { DiscountService } from '../../../services/discountService/discount.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'fn-update-discount',
  templateUrl: './update-discount.component.html',
  styleUrls: ['./update-discount.component.css']
})
export class UpdateDiscountComponent {
  discount:Discount = {} as Discount;
  codeMarcaSelected:string = "";
  alert:boolean = false
  private subscription = new Subscription();


  constructor(private discountService:DiscountService, private activatedRoute: ActivatedRoute, private route:Router){
  }

  ngOnInit(): void {
    this.subscription.add(
      this.activatedRoute.queryParams.subscribe(params => {
        this.codeMarcaSelected = params["codigo"];
      }),
    )
    this.subscription.add(
      this.discountService.getByCode(this.codeMarcaSelected).subscribe(
        (response:Discount)=>{
          this.discount=response;
        }),
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  editarMarca(){
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
