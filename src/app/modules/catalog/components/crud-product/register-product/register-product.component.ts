import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../../../services/storage/storage.service';
import {productService} from "../../../services/productService/product.service";
import {Producto} from "../../../models/producto";
import {Subscription} from "rxjs";

@Component({
  selector: 'fn-register-product',
  templateUrl: './register-product.component.html',
  styleUrls: ['./register-product.component.css']
})
export class RegisterProductComponent implements OnInit, OnDestroy {
  categories: String[] = [
  ]
  allModels:Producto[]=[];
  codeProductSelected = "";
  model:Producto = {} as Producto;
  private subscription = new Subscription();

    constructor(private storageService: StorageService, private httpClientService:productService) { }
    ngOnInit(): void {
      this.subscription.add(
        this.httpClientService.getAllProducts().subscribe(
          (response:Producto[])=>{
            this.allModels=response;
            }
        )
      )
    }

    ngOnDestroy() {
      this.subscription.unsubscribe();
    }

  getModelByCode(){
    this.subscription.add(
      this.httpClientService.getProductByCode(this.codeProductSelected).subscribe(
        (response:Producto)=>{
          this.model=response;
        }
      )
    )
  }

    formArticle = new FormGroup({

      codigo: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100),
        Validators.pattern('^[a-zA-Z0-9 ]+$')
      ]), //validacion que no acepte caracteres especiales
      codigo_marca: new FormControl('', [Validators.required]),
      categorias_id: new FormControl('', [Validators.required]),
      precio_minorista: new FormControl(null, [Validators.required]),
      precio_mayorista: new FormControl(null, [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      dimensiones: new FormControl(null, [Validators.required]), // Inicializado en 0 como número
      peso: new FormControl(null, [Validators.required]), // Inicializado en 0 como número
      color: new FormControl('', [Validators.required]),
      material: new FormControl('', [Validators.required]),
      pais: new FormControl('', [Validators.required]),
      imageURL: new FormControl('', [Validators.required]),
    });





    addElement(){
      if(this.formArticle.value.categorias_id != 'Abrir Menu' && this.formArticle.value.categorias_id != null){
        for(let i = 0; i < this.categories.length; i++){
          if(this.categories[i] == this.formArticle.value.categorias_id){
            return;
          }
        }
        this.categories.push(this.formArticle.value.categorias_id);
      }
    }


    removeCategory(categories: any){
      this.categories.splice(this.categories.indexOf(categories), 1);
    }


    onSubmit() {
      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.formArticle.value, null, 4));
    }

    resetFields(){
      alert("SUCCESS");
    }

    readPhoto(event:any){
      const archivoCapturado = event.target.files[0];
      if (archivoCapturado instanceof Blob) {
        let reader = new FileReader();
        reader.readAsDataURL(archivoCapturado);
        reader.onloadend = async () => {
          const imagen = reader.result;
          this.formArticle.value.imageURL = await this.storageService.subirImagen(archivoCapturado);
        };
      }
      else {
        this.formArticle.value.imageURL = "";
      }
    }
}
