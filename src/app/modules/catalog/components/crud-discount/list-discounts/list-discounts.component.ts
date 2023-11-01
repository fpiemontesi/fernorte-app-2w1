import { Component } from '@angular/core';
import { Discount } from '../../../models/discount';
import { DiscountService } from '../../../services/discountService/discount.service';
import { Subscription } from 'rxjs';
import { productService } from '../../../services/productService/product.service';
import { Producto } from '../../../models/producto';

@Component({
  selector: 'fn-list-discounts',
  templateUrl: './list-discounts.component.html',
  styleUrls: ['./list-discounts.component.css']
})
export class ListDiscountsComponent {
  lista:Discount[]=[];
  listaproduct:Producto[]=[]
  codigoDiscount = "";
  alert:boolean = false;
  private subscription = new Subscription();
  constructor(private discountService:DiscountService, private pService:productService) {


  }
  ngOnInit(): void {
    this.loadDiscounts();

    this.pService.getAllProducts().subscribe({
      next:(productos:Producto[])=>{
        this.listaproduct = productos
      },
      error:()=> {
        alert("error")
      }
    })
  }
  obtenerNombreProducto(code:string): string{
    const producto = this.listaproduct.find(m => m.codigo === code);
    return producto ? producto.nombre : 'Desconocida';
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
