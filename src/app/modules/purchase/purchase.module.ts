import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './components/home/home.component';
import { ModalComponentComponent } from './components/proveedores/modal-component/modal-component.component';
import { ProveedoresComponent } from './components/proveedores/proveedores/proveedores.component';
import { ModalComponentbajaComponent } from './components/proveedores/modal-componentbaja/modal-componentbaja.component';
import { ModalComponenteditarComponent } from './components/proveedores/modal-componenteditar/modal-componenteditar.component';
import {NavbarComponent } from './components/navbar/navbar.component';
import { NavbarItemComponent } from './components/navbar/item-navbar/item-navbar.component';



@NgModule({
  declarations: [HomeComponent,ModalComponentComponent, ProveedoresComponent, ModalComponentbajaComponent, ModalComponenteditarComponent,NavbarComponent, NavbarItemComponent],
  providers: [],
  imports: [CommonModule],
  exports: [HomeComponent],
})
export class PurchaseModule {}
