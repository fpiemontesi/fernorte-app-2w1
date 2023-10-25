import { Component, EventEmitter, OnInit,Output } from '@angular/core';
import { ServiceMarcaService } from '../../services/service-marca.service';
import { Marca } from '../../models/marca';
import { Subscription } from 'rxjs';

@Component({
  selector: 'fn-list-marcas',
  templateUrl: './list-marcas.component.html',
  styleUrls: ['./list-marcas.component.css']
})
export class ListMarcasComponent implements OnInit {
  @Output() newMarca = new EventEmitter();
  @Output() Marcaeditar = new EventEmitter();
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
  onNewMarca(){
    this.newMarca.emit();

  }

  modificarMarca(marca:Marca){
    this.marcaService.guardarMarca(marca)
    this.Marcaeditar.emit()
    
  }

  eliminarMarca(id:string){
    const confirmed = confirm("Seguro que desea borrar el producto?")
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
