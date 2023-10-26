import { Component, EventEmitter,OnDestroy,OnInit,Output } from '@angular/core';
import { Marca } from '../../models/marca';
import { MarcaService } from '../../services/marca.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'fn-alta-marcas',
  templateUrl: './alta-marcas.component.html',
  styleUrls: ['./alta-marcas.component.css']
})
export class AltaMarcasComponent implements OnDestroy{
  alert:boolean = false;
  @Output() cargadoMarca = new EventEmitter();
  private subscription = new Subscription();
  marca:Marca = {} as Marca;
  constructor(private marcaService:MarcaService){}
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
  volver(){
    this.cargadoMarca.emit()
  }
  agregarMarca(){
    this.subscription.add(
      this.marcaService.create(this.marca).subscribe({
        next: async (marca:Marca)=>{
          await this.toggleAlert()
          this.marca = {} as Marca
          this.cargadoMarca.emit();
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
