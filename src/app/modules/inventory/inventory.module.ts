import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { ListStockExistenciasComponent } from './components/list-stock-existencias/list-stock-existencias.component';
import { ReservationListComponent } from './components/reservation-list/reservation-list.component';
import { ListBatchesByExistenceComponent } from './components/list-batches-by-existence/list-batches-by-existence.component';
import { ListBatchesBySectionComponent } from './components/list-batches-by-section/list-batches-by-section.component';
import { RegistrarRemitoComponent } from './components/remito/registrar-remito/registrar-remito.component';
import { RegistrarLotesComponent } from './components/registrar-lotes/registrar-lotes.component';
import { FormsModule } from '@angular/forms';
import { ToastsComponent } from './components/toast/toasts.component';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { StadisticsExpiredExistancesComponent } from './components/stadistics-expired-existances/stadistics-expired-existances.component';
import { StadisticsDamagedExistancesComponent } from './components/stadistics-damaged-existances/stadistics-damaged-existances.component';

@NgModule({
  declarations: [HomeComponent, ListBatchesByExistenceComponent, ListBatchesBySectionComponent, 
                 RegistrarLotesComponent, RegistrarRemitoComponent, ToastsComponent, ReservationListComponent, ListStockExistenciasComponent,
                StadisticsExpiredExistancesComponent, StadisticsDamagedExistancesComponent],
  providers: [],
  imports: [
    CommonModule,
    FormsModule,
    NgbToast
  ],
  exports: [HomeComponent],
})
export class InventaryModule {}
