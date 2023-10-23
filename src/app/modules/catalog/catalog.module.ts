import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { RegisterArticleComponent } from './components/register-article/register-article.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UpdateProductComponent } from './components/update-product/update-product.component';

@NgModule({
  declarations: [HomeComponent, RegisterArticleComponent, UpdateProductComponent],
  providers: [],
    imports: [CommonModule,
        ReactiveFormsModule, FormsModule],
  exports: [HomeComponent],
})
export class CatalogModule {}
