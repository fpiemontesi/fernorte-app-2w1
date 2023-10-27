import {Component, OnDestroy} from '@angular/core';
import {ServiceMarcaService} from "../../../services/brandService/service-marca.service";
import {Marca} from "../../../models/marca";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'fn-register-brand',
  templateUrl: './register-brand.component.html',
  styleUrls: ['./register-brand.component.css']
})
export class RegisterBrandComponent implements OnDestroy{
  marca:Marca = {} as Marca;
  alert:boolean = false;
  private subscription = new Subscription();
  constructor(private marcaService:ServiceMarcaService, private router:Router){}

  ngOnInit(): void {

  }

  cleanForm(){
    this.marca = {} as Marca
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  agregarMarca(){
    this.marcaService.create(this.marca).subscribe({
      next: async (marca:Marca)=>{
        await this.toggleAlert()
        this.marca = {} as Marca
        this.router.navigate(["listBrands"])
      },
      error:()=>{
        alert("Ocurrio un error")
      }
    })
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
