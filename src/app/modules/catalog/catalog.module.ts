import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { RegisterArticleComponent } from './components/register-article/register-article.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent, RegisterArticleComponent],
  providers: [],
  imports: [CommonModule,
    ReactiveFormsModule ],
  exports: [HomeComponent],
})
export class CatalogModule {}
