import { NgModule } from '@angular/core';
import { RegisterArticleComponent } from './components/register-article/register-article.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'register-article',
    component: RegisterArticleComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule { }
