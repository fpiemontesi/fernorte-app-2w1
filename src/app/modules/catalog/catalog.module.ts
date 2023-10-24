import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { RegisterArticleComponent } from './components/register-article/register-article.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { DeleteProductComponent } from './components/delete-product-list/delete-product.component';

@NgModule({
  declarations: [HomeComponent, RegisterArticleComponent, UpdateProductComponent, DeleteProductComponent],
  providers: [],
    imports: [CommonModule,
        ReactiveFormsModule, FormsModule],
  exports: [HomeComponent],
})
export class CatalogModule {}
