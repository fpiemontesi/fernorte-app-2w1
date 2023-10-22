import { Component, EventEmitter, Output } from '@angular/core';
import { Categoria } from '../../models/categoria';
import { CategoriaService } from '../../services/categoria.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditarCategoriaComponent } from '../editar-categoria/editar-categoria.component';
import { AltaCategoriaComponent } from '../alta-categoria/alta-categoria.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'fn-list-categorias',
  templateUrl: './list-categorias.component.html',
  styleUrls: ['./list-categorias.component.css']
})
export class ListCategoriasComponent {

  @Output() newCategoria = new EventEmitter();
  @Output() editarCategoria = new EventEmitter();

  lista: Categoria[] = [];

  private subscription = new Subscription();
  constructor(private categoriaService: CategoriaService) {
  }

  ngOnInit(): void {
    this.categoriaService.get().subscribe({
      next: (categorias: Categoria[]) => {
        this.lista = categorias;
      },
      error: () => {
        alert("Error al intentar cargar categorías.")
      }
    })
  }

  onNewCategoria() {
    this.newCategoria.emit();
  }

  modificarCategoria(categoria: Categoria) {
    this.categoriaService.guardarCategoria(categoria)
    this.editarCategoria.emit()
  }

  eliminarCategoria(id: string) {
    const confirmed = confirm("¿Desea eliminar la categoría?")
    if (confirmed) {
      this.categoriaService.delete(id).subscribe({
        next: (categoria: Categoria) => {
          alert("Categoría eliminada exitosamente.")
          this.loadCategorias()
        },
        error: () => {
          alert("Error al intentar eliminar categoría.")
        }
      })
    }
  }

  private loadCategorias() {
    this.subscription.add(
      this.categoriaService.get().subscribe({
        next: (categorias: Categoria[]) => {
          this.lista = categorias
        },
        error: () => {
          alert("Error al intentar cargar categorías.")
        }
      })
    )
  }

}
