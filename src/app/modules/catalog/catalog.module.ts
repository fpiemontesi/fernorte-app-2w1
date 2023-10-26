import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterProductComponent } from './components/crud-product/register-product/register-product.component';
import { UpdateProductComponent } from './components/crud-product/update-product/update-product.component';
import { DeleteProductComponent } from './components/crud-product/delete-product-list/delete-product.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AltaCategoriaComponent } from './components/crud-category/alta-categoria/alta-categoria.component';
import { EditarCategoriaComponent } from './components/crud-category/editar-categoria/editar-categoria.component';
import { ListCategoriasComponent } from './components/crud-category/list-categorias/list-categorias.component';
import {RouterModule, Routes} from "@angular/router";



const routes:Routes = [
  {path:"registerProduct", component:RegisterProductComponent},
  {path:"updateProduct", component:UpdateProductComponent},
  {path:"deleteProduct", component:DeleteProductComponent},
  {path:"registerCategory", component:AltaCategoriaComponent},
  {path:"listCategories",
    children:[
      {path:"updateCategory", component:EditarCategoriaComponent},
      {path:"", component:ListCategoriasComponent},
    ]
  },


];

@NgModule({
  declarations: [HomeComponent, RegisterProductComponent, UpdateProductComponent, DeleteProductComponent, AltaCategoriaComponent, EditarCategoriaComponent, ListCategoriasComponent],
  providers: [],
  imports: [CommonModule, FormsModule, NgbModule, ReactiveFormsModule, RouterModule.forRoot(routes)],
  exports: [HomeComponent, RouterModule],

})
export class CatalogModule {}
