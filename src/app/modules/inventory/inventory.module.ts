import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { RemitosHomeComponent } from './components/remitos/remitos-home/remitos-home.component';
import { LotesHomeComponent } from './components/batches/lotes-home/lotes-home.component';
import {InventoryAppRoutingModule} from "./inventory-app-routing.module";
import { ReservationListComponent } from './components/reservations/reservation-list/reservation-list.component';
import { ListBatchesByExistenceComponent } from './components/batches/list-batches-by-existence/list-batches-by-existence.component';
import { ListStockExistenciasComponent } from './components/existences/list-stock-existencias/list-stock-existencias.component';
import { RegistrarRemitoComponent } from './components/remitos/registrar-remito/registrar-remito.component';
import { RegistrarLotesComponent } from './components/batches/registrar-lotes/registrar-lotes.component';
import { FormsModule } from '@angular/forms';
import { ToastsComponent } from './components/toast/toasts.component';
import { NgbDropdownModule, NgbNavModule, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { CreateSectionComponent } from './components/sections/create-section/create-section.component';
import { ListBatchesBySectionComponent } from './components/batches/list-batches-by-section/list-batches-by-section.component';
import { ExistencesHomeComponent } from './components/existences/existences-home/existences-home.component';
import { ReservationsHomeComponent } from './components/reservations/reservations-home/reservations-home.component';

@NgModule({
  declarations: [HomeComponent, ListBatchesByExistenceComponent, ListBatchesBySectionComponent,
                 RegistrarLotesComponent, RegistrarRemitoComponent,CreateSectionComponent, ToastsComponent, ReservationListComponent, ListStockExistenciasComponent, RemitosHomeComponent, LotesHomeComponent, ExistencesHomeComponent, ReservationsHomeComponent],
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
