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
    this.getAllProducts();
  }

  getAllProducts(){
    this.httpClientService.getAllProducts().subscribe(
      (response:Producto[])=>{
        this.products=response;
      }
    );
  }



  deleteProduct(id: string) {
    const confirmed = confirm("¿Desea eliminar la categoría?")
    if (confirmed) {
      this.httpClientService.deleteProduct(id).subscribe({
        next: (producto: Producto) => {
          alert("Categoría eliminada exitosamente.")
          this.getAllProducts();
        },
        error: () => {
          alert("Error al intentar eliminar categoría.")
        }
      })
    }
  }

}
