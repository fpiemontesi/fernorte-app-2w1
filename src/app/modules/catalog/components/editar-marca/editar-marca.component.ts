import { Component, EventEmitter, OnDestroy, OnInit,Output } from '@angular/core';
import { Marca } from '../../models/marca';
import { MarcaService } from '../../services/marca.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'fn-editar-marca',
  templateUrl: './editar-marca.component.html',
  styleUrls: ['./editar-marca.component.css']
})
export class EditarMarcaComponent implements OnInit, OnDestroy {
  @Output() editadoMarca = new EventEmitter();
  alert:boolean = false
  private subscription = new Subscription();
  marca:Marca = {} as Marca;
  
  

  ngOnInit(): void {
    this.marca = this.marcaService.obtenerMarca()
  }
  constructor(private marcaService:MarcaService){
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
  volver(){
    this.editadoMarca.emit()
  }
  
  editarMarca(){
    this.subscription.add(
      this.marcaService.update(this.marca).subscribe({
        next: async (marca:Marca)=>{
          await this.toggleAlert()
          this.marca = {} as Marca
          this.editadoMarca.emit();
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
