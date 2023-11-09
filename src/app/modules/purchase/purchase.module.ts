import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './components/home/home.component';
import { ModalCatalogoProveedoresComponent } from './components/catalogo-proveedores/modal-catalogo-proveedores/modal-catalogo-proveedores.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent, ModalCatalogoProveedoresComponent],
  providers: [],
  imports: [CommonModule, FormsModule],
  exports: [HomeComponent],
})
export class PurchaseModule {}
