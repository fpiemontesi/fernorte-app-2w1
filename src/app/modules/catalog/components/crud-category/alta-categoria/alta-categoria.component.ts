import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { Categoria } from '../../../models/categoria';
import { CategoriaService } from '../../../services/categoryService/categoria.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import {Router} from "@angular/router";

@Component({
  selector: 'fn-alta-categoria',
  templateUrl: './alta-categoria.component.html',
  styleUrls: ['./alta-categoria.component.css']
})
export class AltaCategoriaComponent implements OnInit,OnDestroy{

  categoria:Categoria = {} as Categoria;
  private subscription = new Subscription();

  constructor(private categoriaService:CategoriaService, private router:Router){}

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  agregarCategoria(){
    this.subscription.add(
      this.categoriaService.create(this.categoria).subscribe({
        next: (categoria:Categoria)=>{
          alert("La categoría se registró correctamente.")
          this.categoria = {} as Categoria
          this.router.navigate(["listCategories"])
        },
        error:()=>{
          alert("Error al intentar crear categoría.")
        }
      })
    )
  }

}
