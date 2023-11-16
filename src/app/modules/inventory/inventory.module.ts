import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { RegistrarRemitoComponent } from './components/remitos/registrar-remito/registrar-remito.component';
import { RegistrarLotesComponent } from './components/lotes/registrar-lotes/registrar-lotes.component';
import { FormsModule } from '@angular/forms';
import { ToastsComponent } from './components/toast/toasts.component';
import { NgbDropdownModule, NgbNavModule, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { RemitosHomeComponent } from './components/remitos/remitos-home/remitos-home.component';
import { LotesHomeComponent } from './components/lotes/lotes-home/lotes-home.component';
import {InventoryAppRoutingModule} from "./inventory-app-routing.module";

@NgModule({
  declarations: [HomeComponent, RegistrarLotesComponent, RegistrarRemitoComponent, ToastsComponent, RemitosHomeComponent, LotesHomeComponent],
  providers: [],
  imports: [
    CommonModule,
    FormsModule,
    NgbToast,
    NgbNavModule,
    InventoryAppRoutingModule,
    NgbDropdownModule,
  ],
  exports: [
    HomeComponent,
    RouterModule
  ],
})
export class InventaryModule {}
