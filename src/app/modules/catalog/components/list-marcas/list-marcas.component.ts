import { Component, EventEmitter, OnDestroy, OnInit,Output } from '@angular/core';
import { MarcaService } from '../../services/marca.service';
import { Marca } from '../../models/marca';
import { Subscription } from 'rxjs';

@Component({
  selector: 'fn-list-marcas',
  templateUrl: './list-marcas.component.html',
  styleUrls: ['./list-marcas.component.css']
})
export class ListMarcasComponent implements OnInit, OnDestroy {
  @Output() newMarca = new EventEmitter();
  @Output() marcaEditar = new EventEmitter();
  alert:boolean = false;
  modal:boolean= false;
  idMarca: string = "";
  lista:Marca[]=[];
  private subscription = new Subscription();
  constructor(private marcaService:MarcaService) {

    
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }


  ngOnInit(): void {
    this.subscription.add(
      this.marcaService.get().subscribe({
        next: (marcas:Marca[]) =>{
          this.lista=marcas;
        },
        error: () => {
          alert("error")
        }
      })
    )
    
  }
  onNewMarca(){
    this.newMarca.emit();
  }
  modificarMarca(marca:Marca){
    this.marcaService.guardarMarca(marca)
    this.marcaEditar.emit()
    
  }
  guardarId(id:string){
    this.idMarca = id;
  }

  eliminarMarca(){
    this.subscription.add(
      this.marcaService.delete(this.idMarca).subscribe({
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
