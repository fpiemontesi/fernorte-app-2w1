import {Component, OnInit} from '@angular/core';
import {Producto} from "../../models/producto";
import {HttpClientService} from "../../services/httpClient/http-client.service";

@Component({
  selector: 'fn-delete-product-list',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit{

  constructor(private httpClientService:HttpClientService) {
  }

  products:Producto[] = [];

  ngOnInit(): void {
    this.getProductsActive();
  }

  getProductsActive(){
    this.httpClientService.getProductsActive().subscribe(
      (response:Producto[])=>{
        this.products=response;
      }
    );
  }



  deleteProduct(id: string) {
    const confirmed = confirm("¿Desea eliminar el producto?")
    if (confirmed) {
      this.httpClientService.deleteProduct(id).subscribe({
        next: (producto: Producto) => {
          alert("Producto eliminado exitosamente.")
          this.getProductsActive();
        },
        error: () => {
          alert("Error al intentar eliminar el producto.")
        }
      })
    }
  }

}
