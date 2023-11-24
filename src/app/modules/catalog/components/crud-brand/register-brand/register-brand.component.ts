import {Component, OnDestroy} from '@angular/core';
import {ServiceMarcaService} from "../../../services/brandService/service-marca.service";
import {Marca} from "../../../models/marca";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import { NgForm } from '@angular/forms';
import { BrandDto } from '../../dtos/brand-dto';

@Component({
  selector: 'fn-register-brand',
  templateUrl: './register-brand.component.html',
  styleUrls: ['./register-brand.component.css']
})
export class RegisterBrandComponent implements OnDestroy{
  marca:BrandDto = {} as BrandDto;
  alert:boolean = false;
  private subscription = new Subscription();
  constructor(private marcaService:ServiceMarcaService, private router:Router){}

  cleanForm(){
    this.marca = {} as BrandDto
    this.router.navigate(["/listBrands"])
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  agregarMarca(){
    this.subscription.add(
      this.marcaService.create(this.marca).subscribe({
        next: async (marca:BrandDto)=>{
          await this.toggleAlert()
          this.marca = {} as BrandDto
          this.router.navigate(["listBrands"])
        },
        error:()=>{
          alert("Ocurrio un error")
        }
      })
    )
  }
  enviarForm(formulario: NgForm){
    if(formulario.valid){
      this.agregarMarca()
    }
  }

  toggleAlert(): Promise<void> {
    this.alert = !this.alert;

    if (this.alert) {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.alert = false;
          resolve();
        }, 1000);
      });
    } else {
      return Promise.resolve();
    }
  }
}
