import { Component, OnDestroy, OnInit } from '@angular/core';
import { Categoria } from '../../../models/categoria';
import { CategoriaService } from '../../../services/categoryService/categoria.service';
import { Subscription } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'fn-list-categorias',
  templateUrl: './list-categorias.component.html',
  styleUrls: ['./list-categorias.component.css']
})
export class ListCategoriasComponent implements OnInit, OnDestroy {

  lista: Categoria[] = [];
  private subscription = new Subscription();
  alert: boolean = false;
  codigoCategoria = "";

  constructor(private categoriaService: CategoriaService) {
  }

  ngOnInit(): void {
    this.subscription.add(
      this.categoriaService.get().subscribe({
        next: (categorias: Categoria[]) => {
          this.lista = categorias;
        },
        error: () => {
          alert("Error al intentar cargar categorías.")
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  eliminarCategoria() {
    this.subscription.add(
      this.categoriaService.delete(this.codigoCategoria).subscribe({
        next: async (categoria: Categoria) => {
          await this.toggleAlert();
          this.loadCategorias()
        },
        error: () => {
          alert("Error al intentar eliminar categoría.")
        }
      })
    )
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

  toggleAlert(): Promise<void> {
    this.alert = !this.alert;

    if (this.alert) {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.alert = false;
          resolve();
        }, 1000);
      });
    } else {
      return Promise.resolve();
    }
  }

  guardarCodigo(codigo:string){
    this.codigoCategoria = codigo;
  }
}
