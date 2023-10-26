import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {ServiceMarcaService} from "../../../services/brandService/service-marca.service";
import {Marca} from "../../../models/marca";

@Component({
  selector: 'fn-update-brand',
  templateUrl: './update-brand.component.html',
  styleUrls: ['./update-brand.component.css']
})
export class UpdateBrandComponent implements OnInit{
  marca:Marca = {} as Marca;
  codeMarcaSelected:string = "";


  constructor(private marcaService:ServiceMarcaService, private activatedRoute: ActivatedRoute, private route:Router){
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.codeMarcaSelected = params["codigo"];
    });
    this.marcaService.getByCode(this.codeMarcaSelected).subscribe(
        (response:Marca)=>{
            this.marca=response;
        }
    )
    console.log(this.marca)
  }

  editarMarca(){
    this.marcaService.update(this.marca).subscribe({
      next: (marca:Marca)=>{
        alert("Se actualizo correctamente")
        this.marca = {} as Marca
        this.route.navigate(["/listBrands"])
      },
      error:()=>{
        alert("Ocurrio un error")
      }
    })
    this.marca= {} as Marca;
  }
}
