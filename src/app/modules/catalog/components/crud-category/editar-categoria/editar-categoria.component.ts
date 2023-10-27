import {Component, OnDestroy, OnInit} from '@angular/core';
import {Categoria} from '../../../models/categoria';
import {CategoriaService} from '../../../services/categoryService/categoria.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'fn-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.css']
})
export class EditarCategoriaComponent implements OnInit, OnDestroy{

  codeCategorySelected:string = "";
  categoria: Categoria = {} as Categoria;
  private subscription = new Subscription();

  constructor(private categoriaService: CategoriaService, private activatedRoute: ActivatedRoute, private router:Router) {
  }

  ngOnInit(): void {
    this.subscription.add(
      this.activatedRoute.queryParams.subscribe(params => {
        this.codeCategorySelected = params["codigo"];
      })
    );
    this.subscription.add(
      this.categoriaService.getByCode(this.codeCategorySelected).subscribe(
        (response:Categoria)=>{
          this.categoria=response;
        }
      )
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  editarCategoria() {
    this.subscription.add(
      this.categoriaService.update(this.codeCategorySelected, this.categoria).subscribe({
        next: (categoria: Categoria) => {
          alert("Categoría actualizada correctamente.")
          this.categoria = {} as Categoria
          this.router.navigate(["/listCategories"])
        },
        error: () => {
          alert("Error al intentar actualizar categoría.")
        }
      })
    )
  }

}
