import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { AltaMarcasComponent } from './components/alta-marcas/alta-marcas.component';

import { HttpClientModule } from '@angular/common/http';
import { ListMarcasComponent } from './components/list-marcas/list-marcas.component';
import { FormsModule, NgForm } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditarMarcaComponent } from './components/editar-marca/editar-marca.component';
import { AlertComponent } from './components/alert/alert.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [HomeComponent, AltaMarcasComponent,ListMarcasComponent, EditarMarcaComponent, AlertComponent, ModalComponent],
  providers: [],
  imports: [
    CommonModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
  ],
  exports: [HomeComponent],
})
export class CatalogModule {}
