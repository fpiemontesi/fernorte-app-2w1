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
import { ListDiscountsComponent } from './components/crud-discount/list-discounts/list-discounts.component';
import { RegisterDiscountComponent } from './components/crud-discount/register-discount/register-discount.component';
import { UpdateDiscountComponent } from './components/crud-discount/update-discount/update-discount.component';
import { ListOffersComponent } from './components/crud-offer/list-offers/list-offers.component';
import { RegisterOfferComponent } from './components/crud-offer/register-offer/register-offer.component';
import { UpdateOfferComponent } from './components/crud-offer/update-offer/update-offer.component';




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
    {
      path:'listDiscounts',
      children: [
        {path:'updateDiscount', component: UpdateDiscountComponent},
        {path:'registerDiscount', component:RegisterDiscountComponent},
        {path:"", component:ListDiscountsComponent},
      ]},
      {
        path:'listOffers',
        children:[
          {path:'updateOffer',component: UpdateOfferComponent},
          {path:'registerOffer',component: RegisterOfferComponent},
          {path: '',component: ListOffersComponent}
        ]},
];

@NgModule({
  declarations: [HomeComponent, RegisterProductComponent, UpdateProductComponent, DeleteProductComponent, AltaCategoriaComponent, EditarCategoriaComponent, ListCategoriasComponent, RegisterBrandComponent, UpdateBrandComponent, ListBrandsComponent, AlertComponent, ModalComponent, ListDiscountsComponent, RegisterDiscountComponent, UpdateDiscountComponent, ListOffersComponent, RegisterOfferComponent, UpdateOfferComponent],
  providers: [],
  imports: [CommonModule, FormsModule, NgbModule, ReactiveFormsModule, RouterModule.forRoot(routes)],
  exports: [HomeComponent, RouterModule],

})
export class CatalogModule {}
