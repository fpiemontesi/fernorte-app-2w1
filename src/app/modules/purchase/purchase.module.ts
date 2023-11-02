import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './components/home/home.component';
import { ModalComponentComponent } from './components/modal-component/modal-component.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { ModalComponentbajaComponent } from './components/modal-componentbaja/modal-componentbaja.component';
import { ModalComponenteditarComponent } from './components/modal-componenteditar/modal-componenteditar.component';
import { OrdenCompraComponent } from './components/orden-compra/orden-compra.component';


@NgModule({
  declarations: [HomeComponent,ModalComponentComponent, ProveedoresComponent, ModalComponentbajaComponent, ModalComponenteditarComponent, OrdenCompraComponent],
  providers: [],
  imports: [CommonModule],
  exports: [HomeComponent],
})
export class PurchaseModule {}
