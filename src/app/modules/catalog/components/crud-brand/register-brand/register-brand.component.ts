import { Component } from '@angular/core';
import {ServiceMarcaService} from "../../../services/brandService/service-marca.service";
import {Marca} from "../../../models/marca";

@Component({
  selector: 'fn-register-brand',
  templateUrl: './register-brand.component.html',
  styleUrls: ['./register-brand.component.css']
})
export class RegisterBrandComponent {
  marca:Marca = {} as Marca;
  constructor(private marcaService:ServiceMarcaService){}

  ngOnInit(): void {

  }

  cleanForm(){

  }


  agregarMarca(){
    this.marcaService.create(this.marca).subscribe({
      next: (marca:Marca)=>{
        alert("Se registro correctamente")
        this.marca = {} as Marca
      },
      error:()=>{
        alert("Ocurrio un error")
      }
    })
  }
}
