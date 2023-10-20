import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { RegisterArticleComponent } from './components/register-article/register-article.component';
import { UpdateArticleComponent } from './components/update-article/update-article.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [HomeComponent, RegisterArticleComponent, UpdateArticleComponent, ],
  providers: [],
  imports: [CommonModule, FormsModule],
  exports: [HomeComponent],
})
export class CatalogModule {}
