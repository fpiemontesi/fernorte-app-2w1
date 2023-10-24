import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { AltaCategoriaComponent } from './components/alta-categoria/alta-categoria.component';
import { EditarCategoriaComponent } from './components/editar-categoria/editar-categoria.component';
import { ListCategoriasComponent } from './components/list-categorias/list-categorias.component';
import { FormsModule } from '@angular/forms';
import { CategoriaService } from './services/categoria.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SwalModule } from '@sweetalert2/ngx-sweetalert2/lib/sweetalert2-loader.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
@NgModule({
  declarations: [HomeComponent, AltaCategoriaComponent, EditarCategoriaComponent, ListCategoriasComponent],
  providers: [CategoriaService, BsModalService],
  imports: [CommonModule, FormsModule, NgbModule, SweetAlert2Module],
  exports: [HomeComponent],
})
export class CatalogModule {}
