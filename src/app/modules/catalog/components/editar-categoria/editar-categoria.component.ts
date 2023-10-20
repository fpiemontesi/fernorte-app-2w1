import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Categoria } from '../../models/categoria';
import { CategoriaService } from '../../services/categoria.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'fn-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.css']
})
export class EditarCategoriaComponent {

  @Output() editado = new EventEmitter();
  categoria: Categoria = {} as Categoria;

  ngOnInit(): void {
    this.categoria = this.categoriaService.obtenerCategoria()
  }
  constructor(private categoriaService: CategoriaService) {
  }

  editarCategoria() {
    console.log("categoria en editar" + this.categoria.nombre)
    this.categoriaService.update(this.categoria).subscribe({
      next: (categoria: Categoria) => {
        alert("Se actualizo correctamente")
        this.categoria = {} as Categoria
        this.editado.emit();
      },
      error: () => {
        alert("Ocurrio un error")
      }
    })
    this.categoria = {} as Categoria;
  }

  volverAlInicio() {
    this.editado.emit(); // Emitir el evento para volver al inicio
  }
}
