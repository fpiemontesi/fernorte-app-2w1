import {Component, OnDestroy, OnInit} from '@angular/core';
import {Producto} from "../../../models/producto";
import {StorageService} from "../../../services/storage/storage.service";
import {productService} from "../../../services/productService/product.service";
import {Subscription} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'fn-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit, OnDestroy{
  categories: String[] = []
  allProducts:Producto[]=[];
  productCodeSelected:string = "";
  product:Producto = {} as Producto;
  private subscription = new Subscription();

  formActivo:boolean = false;

  constructor(private storageService: StorageService, private httpClientService:productService) { }
  ngOnInit(): void {
    this.getAllProducts();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getAllProducts(){
    this.subscription.add(
      this.httpClientService.getAllProducts().subscribe(
        (response:Producto[])=>{
          this.allProducts=response;
        }
      )
    )
  }
  getProductByCode(){
    this.subscription.add(
      this.httpClientService.getProductByCode(this.productCodeSelected).subscribe(
        (response:Producto)=>{
          this.product=response;
        })
    )
  }



/*
  addElement(){
    if(this.formArticle.value.categorias != 'Abrir Menu' && this.formArticle.value.categorias != null){
      for(let i = 0; i < this.categories.length; i++){
        if(this.categories[i] == this.formArticle.value.categorias){
          return;
        }
      }
      this.categories.push(this.formArticle.value.categorias);
    }
  }
*/

  removeCategory(categories: any){
    this.categories.splice(this.categories.indexOf(categories), 1);
  }

  llenarForm(){
    this.getProductByCode();
    this.formActivo = true;
  }

  readPhoto(event:any){
    const archivoCapturado = event.target.files[0];
    if (archivoCapturado instanceof Blob) {
      let reader = new FileReader();
      reader.readAsDataURL(archivoCapturado);
      reader.onloadend = async () => {
        const imagen = reader.result;
        this.product.imageURL = await this.storageService.subirImagen(archivoCapturado);
      };
    }
    else {
      this.product.imageURL = "";
    }
  }

  cancelarModificacion(){
    this.productCodeSelected = "";
    this.product = {} as Producto;
    this.formActivo = false;
  }

  updateProductByCode() {
    console.log("A")
    console.log(this.product);
    console.log(this.productCodeSelected);
    this.product.categorias_id = [];
    this.subscription.add(
      this.httpClientService.updateProduct(this.productCodeSelected, this.product).subscribe({
        next: (producto: Producto) => {
          alert("Producto actualizado correctamente.")
          this.product = {} as Producto
          this.getAllProducts();
        },
        error: (errorResponse: HttpErrorResponse) => {
          if (errorResponse.status === 400) {
            console.log("Error 400 - Solicitud incorrecta");
            console.log("Mensaje de error:", errorResponse.error);
          } else {
            console.log("Error desconocido:", errorResponse);
          }
          alert("Error al intentar actualizar producto.");
        }
      })
    )
  }
}
