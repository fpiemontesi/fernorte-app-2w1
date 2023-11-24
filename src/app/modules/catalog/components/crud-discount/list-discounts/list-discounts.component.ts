import { Component } from '@angular/core';
import { Discount } from '../../../models/discount';
import { DiscountService } from '../../../services/discountService/discount.service';
import { Subscription } from 'rxjs';
import { productService } from '../../../services/productService/product.service';
import { Producto } from '../../../models/producto';
import { DiscountDtoProducto } from '../../dtos/discount-dto-producto';

@Component({
  selector: 'fn-list-discounts',
  templateUrl: './list-discounts.component.html',
  styleUrls: ['./list-discounts.component.css']
})
export class ListDiscountsComponent {
  lista:DiscountDtoProducto[]=[];
  listaproduct:Producto[]=[]
  codigoDiscount = "";
  alert:boolean = false;
  check:boolean =false;
  private subscription = new Subscription();
  constructor(private discountService:DiscountService, private pService:productService) {


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
        }, 1000);
      });
    } else {
      return Promise.resolve();
    }
  }

  loadDiscounts(){
    if(this.check==false){
      this.subscription.add(
        this.discountService.get().subscribe({
          next: (discount:DiscountDtoProducto[])=> {
            this.lista=[]
            discount.forEach(d =>{
              if(d.activo==true){
                this.lista.push(d)
              }
            })
  
          },
          error: ()=>{
            console.log("Error al cargar las Descuento")
          }
        })
      )

    }else{
      this.subscription.add(
        this.discountService.get().subscribe({
          next: (discount:DiscountDtoProducto[])=> {
            this.lista=[]
            discount.forEach(d =>{
              if(d.activo==false){
                this.lista.push(d)
              }
            })
  
          },
          error: ()=>{
            console.log("Error al cargar las Descuento")
          }
        })
      )
    }
    
  }

}
