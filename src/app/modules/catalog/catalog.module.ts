import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { AltaCategoriaComponent } from './components/alta-categoria/alta-categoria.component';
import { EditarCategoriaComponent } from './components/editar-categoria/editar-categoria.component';
import { ListCategoriasComponent } from './components/list-categorias/list-categorias.component';
import { FormsModule } from '@angular/forms';
import { CategoriaService } from './services/categoria.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [HomeComponent, AltaCategoriaComponent, EditarCategoriaComponent, ListCategoriasComponent],
  providers: [CategoriaService],
  imports: [CommonModule, FormsModule, NgbModule],
  exports: [HomeComponent],
})
export class CatalogModule {}
