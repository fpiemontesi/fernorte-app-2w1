import {Component, OnDestroy, OnInit} from '@angular/core';
import {ServiceMarcaService} from "../../../services/brandService/service-marca.service";
import {Subscription} from "rxjs";
import {Marca} from "../../../models/marca";

@Component({
  selector: 'fn-list-brands',
  templateUrl: './list-brands.component.html',
  styleUrls: ['./list-brands.component.css']
})
export class ListBrandsComponent implements OnInit,OnDestroy{
  lista:Marca[]=[];
  codigoMarca = "";
  alert:boolean = false;
  modal:boolean= false;
  private subscription = new Subscription();
  constructor(private marcaService:ServiceMarcaService) {


  }
  ngOnInit(): void {
    this.loadMarcas();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  guardarCodigo(codigo:string){
    this.codigoMarca = codigo;
  }

  eliminarMarca(){
    this.subscription.add(
        this.marcaService.delete(this.codigoMarca).subscribe({
          next: async (marca:Marca) => {
            await this.toggleAlert();
            this.loadMarcas()
          },
          error: () => {
            alert("error")
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

  private loadMarcas(){
    this.subscription.add(
      this.marcaService.get().subscribe({
        next: (marcas:Marca[])=> {
          this.lista =marcas
        },
        error: ()=>{
          console.log("Error al cargar las Marcas")
        }
      })
    )
  }
}
