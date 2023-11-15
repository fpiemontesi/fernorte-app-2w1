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
import { RegisterBrandComponent } from './components/crud-brand/register-brand/register-brand.component';
import { UpdateBrandComponent } from './components/crud-brand/update-brand/update-brand.component';
import { ListBrandsComponent } from './components/crud-brand/list-brands/list-brands.component';
import { AlertComponent } from './components/interactions/alert/alert.component';
import { ModalComponent } from './components/interactions/modal/modal.component';
import { RegisterCatalogComponent } from './components/crud-catalog/register-catalog/register-catalog/register-catalog.component';



const routes:Routes = [
  {path:"registerProduct", component:RegisterProductComponent},
  {path:"updateProduct", component:UpdateProductComponent},
  {path:"deleteProduct", component:DeleteProductComponent},
  {path:"listCategories",
    children:[
      {path:"updateCategory", component:EditarCategoriaComponent},
      {path:"registerCategory", component:AltaCategoriaComponent},
      {path:"", component:ListCategoriasComponent},
    ]
  },
  {path:"listBrands",
    children:[
      {path:"updateBrand", component: UpdateBrandComponent},
      {path:"registerBrand", component:RegisterBrandComponent},
      {path:"", component:ListBrandsComponent},
    ]},
  {path:"registerCatalog", component:RegisterCatalogComponent}
];

@NgModule({
  declarations: [HomeComponent, RegisterProductComponent, UpdateProductComponent, DeleteProductComponent, AltaCategoriaComponent, EditarCategoriaComponent, ListCategoriasComponent, RegisterBrandComponent, UpdateBrandComponent, ListBrandsComponent, AlertComponent, ModalComponent, RegisterCatalogComponent],
  providers: [],
  imports: [CommonModule, FormsModule, NgbModule, ReactiveFormsModule, RouterModule.forRoot(routes)],
  exports: [HomeComponent, RouterModule],

})
export class CatalogModule {}
