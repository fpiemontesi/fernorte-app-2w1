import {Component, OnDestroy, OnInit} from '@angular/core';
import {Producto} from "../../../models/producto";
import {productService} from "../../../services/productService/product.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'fn-delete-product-list',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit,OnDestroy{

  constructor(private httpClientService:productService) {
  }

  products:Producto[] = [];
  private subscription = new Subscription();

  ngOnInit(): void {
    this.getProductsActive();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getProductsActive(){
    this.subscription.add(
      this.httpClientService.getProductsActive().subscribe(
        (response:Producto[])=>{
          this.products=response;
        })
    )
  }



  deleteProduct(id: string) {
    const confirmed = confirm("¿Desea eliminar el producto?")
    if (confirmed) {
      this.subscription.add(
        this.httpClientService.deleteProduct(id).subscribe({
          next: (producto: Producto) => {
            alert("Producto eliminado exitosamente.")
            this.getProductsActive();
          },
          error: () => {
            alert("Error al intentar eliminar el producto.")
          }
        })
      )
    }
  }



}
