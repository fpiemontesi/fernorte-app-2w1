import { Component, EventEmitter,OnInit,Output } from '@angular/core';
import { Marca } from '../../models/marca';
import { ServiceMarcaService } from '../../services/service-marca.service';

@Component({
  selector: 'fn-alta-marcas',
  templateUrl: './alta-marcas.component.html',
  styleUrls: ['./alta-marcas.component.css']
})
export class AltaMarcasComponent implements OnInit{
  @Output() cargadoMarca = new EventEmitter();
  marca:Marca = {} as Marca;
  constructor(private marcaService:ServiceMarcaService){}

  ngOnInit(): void {
    
  }
  volver(){
    this.cargadoMarca.emit()
  }

  agregarMarca(){
    this.marcaService.create(this.marca).subscribe({
      next: (marca:Marca)=>{
        alert("Se registro correctamente")
        this.marca = {} as Marca
        this.cargadoMarca.emit();
      },
      error:()=>{
        alert("Ocurrio un error")
      }
    })
  }

}
