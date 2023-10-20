import { Component, EventEmitter, OnInit,Output } from '@angular/core';
import { Marca } from '../../models/marca';
import { ServiceMarcaService } from '../../services/service-marca.service';

@Component({
  selector: 'fn-editar-marca',
  templateUrl: './editar-marca.component.html',
  styleUrls: ['./editar-marca.component.css']
})
export class EditarMarcaComponent implements OnInit {
  @Output() editadoMarca = new EventEmitter();
  marca:Marca = {} as Marca;
  
  

  ngOnInit(): void {
    this.marca = this.marcaService.obtenerMarca()
  }
  constructor(private marcaService:ServiceMarcaService){
  }
  volver(){
    this.editadoMarca.emit()
  }
  
  editarMarca(){
    console.log("marca en editar"+this.marca.nombre)
    this.marcaService.update(this.marca).subscribe({
      next: (marca:Marca)=>{
        alert("Se actualizo correctamente")
        this.marca = {} as Marca
        this.editadoMarca.emit();
      },
      error:()=>{
        alert("Ocurrio un error")
      }
    })
    this.marca= {} as Marca;
  }



}
