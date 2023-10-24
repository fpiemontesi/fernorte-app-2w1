import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Categoria } from '../../models/categoria';
import { CategoriaService } from '../../services/categoria.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

@Component({
  selector: 'fn-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.css']
})
export class EditarCategoriaComponent {

  @Output() editado = new EventEmitter();
  categoria: Categoria = {} as Categoria;
  private subscription = new Subscription();
  categoriaCodigoOriginal: string = '';

  constructor(private categoriaService: CategoriaService) {
  }

  ngOnInit(): void {
    this.categoria = this.categoriaService.obtenerCategoria()
    this.categoriaCodigoOriginal = this.categoria.codigo;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  editarCategoria() {
    console.log('CÓDIGO editarCategoria(): ' + this.categoria.codigo)
    console.log(this.categoria)
    this.categoriaService.update(this.categoriaCodigoOriginal, this.categoria).subscribe({
      next: (categoria: Categoria) => {
        alert("Categoría actualizada correctamente.")
        this.categoria = {} as Categoria
        this.editado.emit();
      },
      error: () => {
        alert("Error al intentar actualizar categoría.")
      }
    })
    this.categoria = {} as Categoria;
  }

  volverAlInicio() {
    this.editado.emit();
  }
}

