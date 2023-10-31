import { Component } from '@angular/core';
import { Discount } from '../../../models/discount';
import { DiscountService } from '../../../services/discountService/discount.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'fn-list-discounts',
  templateUrl: './list-discounts.component.html',
  styleUrls: ['./list-discounts.component.css']
})
export class ListDiscountsComponent {
  lista:Discount[]=[];
  codigoDiscount = "";
  alert:boolean = false;
  private subscription = new Subscription();
  constructor(private discountService:DiscountService) {


  }
  ngOnInit(): void {
    this.loadDiscounts();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  guardarCodigo(codigo:string){
    this.codigoDiscount = codigo;
  }

  eliminarMarca(){
    this.subscription.add(
        this.discountService.delete(this.codigoDiscount).subscribe({
          next: async (discount:Discount) => {
            await this.toggleAlert();
            this.loadDiscounts()
          },
          error: () => {
            alert("error")
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

  private loadDiscounts(){
    this.subscription.add(
      this.discountService.get().subscribe({
        next: (discount:Discount[])=> {
          this.lista =discount
        },
        error: ()=>{
          console.log("Error al cargar las Descuento")
        }
      })
    )
  }

}
