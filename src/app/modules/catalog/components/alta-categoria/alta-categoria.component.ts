import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Categoria } from '../../models/categoria';
import { CategoriaService } from '../../services/categoria.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

@Component({
  selector: 'fn-alta-categoria',
  templateUrl: './alta-categoria.component.html',
  styleUrls: ['./alta-categoria.component.css']
})
export class AltaCategoriaComponent {

  @Output() cargado = new EventEmitter();
  categoria:Categoria = {} as Categoria;
  constructor(private categoriaService:CategoriaService){}

  ngOnInit(): void {
    
  }

  agregarCategoria(){
    this.categoriaService.create(this.categoria).subscribe({
      next: (categoria:Categoria)=>{
        alert("Se registro correctamente")
        this.categoria = {} as Categoria
        this.cargado.emit();
      },
      error:()=>{
        alert("Ocurrio un error")
      }
    })
  }

  volverAlInicio() {
    this.cargado.emit();
  }
}