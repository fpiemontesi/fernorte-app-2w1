import {Component, OnInit} from '@angular/core';
import {Producto} from "../../models/producto";
import {StorageService} from "../../services/storage/storage.service";
import {HttpClientService} from "../../services/httpClient/http-client.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'fn-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit{
  imagenURL:string = "";
  categories: String[] = [
  ]
  allProducts:Producto[]=[];
  productCodeSelected:string = "";
  product:Producto = {
    categorias: [],
    color: "",
    descripcion: "",
    dimensiones: "",
    id: "",
    marca: "",
    material: "",
    codigo: "",
    nombre: "",
    paisOrigen: "",
    peso: "",
    precio_minorista: 0,
    precio_mayorista: 0,
    activo:true,
  };

  formActivo:boolean = false;
  constructor(private storageService: StorageService, private httpClientService:HttpClientService) { }
  ngOnInit(): void {
    this.httpClientService.getAllProducts().subscribe(
      (response:Producto[])=>{
        this.allProducts=response;
      }
    );
  }

  getModelById(){
    this.httpClientService.getProductByCode(this.productCodeSelected).subscribe(
      (response:Producto)=>{
        this.product=response;
      }
    )
  }

  updateProduct(product: Producto) {
    this.httpClientService.updateProduct(product.codigo, product);
    //this.editarCategoria.emit()
  }

  formArticle = new FormGroup({
    nombre: new FormControl('', [Validators.required,
      Validators.minLength(1),
      Validators.maxLength(100),
      Validators.pattern('^[a-zA-Z0-9 ]+$')
    ]), //validacion que no acepte caracteres especiales


    descripcion: new FormControl('', [Validators.required]),
    codigo: new FormControl('', [Validators.required]),
    marca: new FormControl('', [Validators.required]),
    minorista: new FormControl(null, [Validators.required]),
    mayorista: new FormControl(null, [Validators.required]), // Inicializado en 0 como número
    dimensiones: new FormControl(null, [Validators.required]), // Inicializado en 0 como número
    peso: new FormControl(null, [Validators.required]), // Inicializado en 0 como número
    color: new FormControl('', [Validators.required]),
    material: new FormControl('', [Validators.required]),
    pais: new FormControl('', [Validators.required]),
    categorias: new FormControl('', [Validators.required]),
  });


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


  removeCategory(categories: any){
    this.categories.splice(this.categories.indexOf(categories), 1);
  }


  onSubmit() {
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.formArticle.value, null, 4));
  }

  resetFields(){
    alert("SUCCESS");
  }

  llenarForm(){
    this.getModelById();
    this.imagenURL = "";
    this.formActivo = true;
  }

  readPhoto(event:any){
    const archivoCapturado = event.target.files[0];
    if (archivoCapturado instanceof Blob) {
      let reader = new FileReader();
      reader.readAsDataURL(archivoCapturado);
      reader.onloadend = () => {
        const imagen = reader.result;
        this.imagenURL = imagen as string;
        this.storageService.subirImagen(archivoCapturado);
      };
    } else {
      this.imagenURL = "";
    }
  }

  cancelarModificacion(){
    this.productCodeSelected = "";
    this.product = {
      categorias: [],
      color: "",
      descripcion: "",
      dimensiones: "",
      id: "",
      marca: "",
      material: "",
      codigo: "",
      nombre: "",
      paisOrigen: "",
      peso: "",
      precio_mayorista: 0,
      precio_minorista: 0,
      activo:true,
    };
    this.formActivo = false;
  }
}
