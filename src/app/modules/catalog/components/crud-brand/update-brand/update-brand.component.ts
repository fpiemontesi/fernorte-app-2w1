import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {ServiceMarcaService} from "../../../services/brandService/service-marca.service";
import {Marca} from "../../../models/marca";
import {Subscription} from "rxjs";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'fn-update-brand',
  templateUrl: './update-brand.component.html',
  styleUrls: ['./update-brand.component.css']
})
export class UpdateBrandComponent implements OnInit, OnDestroy{
  marca:Marca = {} as Marca;
  codeMarcaSelected:string = "";
  alert:boolean = false
  private subscription = new Subscription();


  constructor(private marcaService:ServiceMarcaService, private activatedRoute: ActivatedRoute, private route:Router){
  }

  ngOnInit(): void {
    this.subscription.add(
      this.activatedRoute.queryParams.subscribe(params => {
        this.codeMarcaSelected = params["codigo"];
      }),
    )
    this.subscription.add(
      this.marcaService.getByCode(this.codeMarcaSelected).subscribe(
        (response:Marca)=>{
          this.marca=response;
        }),
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  enviarForm(formulario: NgForm){
    if(formulario.valid){
      this.editarMarca()
    }
  }

  editarMarca(){
    this.subscription.add(
        this.marcaService.update(this.marca).subscribe({
          next: async (marca:Marca)=>{
            await this.toggleAlert()
            this.marca = {} as Marca
            this.route.navigate(["/listBrands"])
          },
          error:()=>{
            alert("Ocurrio un error")
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
}
