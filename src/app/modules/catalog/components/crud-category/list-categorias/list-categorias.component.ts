import { Component, EventEmitter, Output } from '@angular/core';
import { Categoria } from '../../../models/categoria';
import { CategoriaService } from '../../../services/categoryService/categoria.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditarCategoriaComponent } from '../editar-categoria/editar-categoria.component';
import { AltaCategoriaComponent } from '../alta-categoria/alta-categoria.component';
import { OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'fn-list-categorias',
  templateUrl: './list-categorias.component.html',
  styleUrls: ['./list-categorias.component.css']
})
export class ListCategoriasComponent {

  lista: Categoria[] = [];
  private subscription = new Subscription();
  private modalRef: BsModalRef = new BsModalRef();

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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  modificarCategoria(categoria: Categoria) {
    this.categoriaService.guardarCategoria(categoria)
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
          console.log("Error al intentar cargar categorías.")
        }
      })
    )
  }

}
