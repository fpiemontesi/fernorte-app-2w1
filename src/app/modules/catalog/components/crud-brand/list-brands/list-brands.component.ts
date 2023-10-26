import { Component } from '@angular/core';
import {ServiceMarcaService} from "../../../services/brandService/service-marca.service";
import {Subscription} from "rxjs";
import {Marca} from "../../../models/marca";

@Component({
  selector: 'fn-list-brands',
  templateUrl: './list-brands.component.html',
  styleUrls: ['./list-brands.component.css']
})
export class ListBrandsComponent {
  lista:Marca[]=[];
  private subscription = new Subscription();
  constructor(private marcaService:ServiceMarcaService) {


  }


  ngOnInit(): void {
    this.marcaService.get().subscribe({
      next: (marcas:Marca[]) =>{
        this.lista=marcas;
      },
      error: () => {
        alert("error")
      }
    })
  }

  eliminarMarca(id:string){
    const confirmed = confirm("Seguro que desea borrar la marca?")
    if(confirmed){
      this.marcaService.delete(id).subscribe({
        next: (marca:Marca) => {
          alert("producto borrado exitosamente")
          this.loadMarcas()
        },
        error: () => {
          alert("error")
        }
      })
    }
  }
  private loadMarcas(){
    this.subscription.add(
      this.marcaService.get().subscribe({
        next: (marcas:Marca[])=> {
          this.lista =marcas
        },
        error: ()=>{
          alert("eror")
        }
      })
    )
  }
}
