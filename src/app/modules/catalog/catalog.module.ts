import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterArticleComponent } from './components/register-article/register-article.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { DeleteProductComponent } from './components/delete-product-list/delete-product.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AltaCategoriaComponent } from './components/alta-categoria/alta-categoria.component';
import { EditarCategoriaComponent } from './components/editar-categoria/editar-categoria.component';
import { ListCategoriasComponent } from './components/list-categorias/list-categorias.component';


@NgModule({
  declarations: [HomeComponent, RegisterArticleComponent, UpdateProductComponent, DeleteProductComponent, AltaCategoriaComponent, EditarCategoriaComponent, ListCategoriasComponent],
  providers: [],
  imports: [CommonModule, FormsModule, NgbModule, ReactiveFormsModule],
  exports: [HomeComponent],

})
export class CatalogModule {}
