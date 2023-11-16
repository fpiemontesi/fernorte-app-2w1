import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { RegistrarRemitoComponent } from './components/remito/registrar-remito/registrar-remito.component';
import { RegistrarLotesComponent } from './components/registrar-lotes/registrar-lotes.component';
import { FormsModule } from '@angular/forms';
import { ToastsComponent } from './components/toast/toasts.component';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { ListarExistenciasStockBajoComponent } from './components/listar-existencias-stock-bajo/listar-existencias-stock-bajo.component';

@NgModule({
  declarations: [HomeComponent, RegistrarLotesComponent, RegistrarRemitoComponent, ToastsComponent, ListarExistenciasStockBajoComponent],
  providers: [],
  imports: [
    CommonModule,
    FormsModule,
    NgbToast
  ],
  exports: [HomeComponent],
})
export class InventaryModule {}
