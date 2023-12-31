import { NgModule } from '@angular/core';
import { CommonModule, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { RemitosHomeComponent } from './components/remitos/remitos-home/remitos-home.component';
import { InventoryAppRoutingModule} from "./inventory-app-routing.module";
import { ReservationListComponent } from './components/reservations/reservation-list/reservation-list.component';
import { ListBatchesByExistenceComponent } from './components/batches/list-batches-by-existence/list-batches-by-existence.component';
import { ListStockExistenciasComponent } from './components/list-stock-existencias/list-stock-existencias.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ToastsComponent } from './components/toast/toasts.component';
import { NgbDropdownModule, NgbNavModule, NgbToast, NgbToastModule} from '@ng-bootstrap/ng-bootstrap';
import { CreateSectionComponent } from './components/sections/create-section/create-section.component';
import { ListBatchesBySectionComponent } from './components/batches/list-batches-by-section/list-batches-by-section.component';
import { CreateControlReportComponent} from "./components/stock-control-reports/create-control-report/create-control-report.component";
import { BatchFinderModalComponent} from "./components/stock-control-reports/batch-finder-modal/batch-finder-modal.component";
import { ModifyStockControlComponent} from "./components/stock-control-reports/modify-stock-control/modify-stock-control.component";
import { ListControlStockComponent} from "./components/stock-control-reports/list-control-stock/list-control-stock.component";
import { ToastsContainer} from "./components/toast/toasts-container.component";
import { StockControlsHomeComponent} from "./components/stock-control-reports/stock-controls-home/stock-controls-home.component";
import { RegistrarRemitoComponent} from "./components/remitos/registrar-remito/registrar-remito.component";
import { RegistrarLotesComponent} from "./components/batches/registrar-lotes/registrar-lotes.component";
import { LotesHomeComponent} from "./components/batches/lotes-home/lotes-home.component";
import { ListBatchesExpiredComponent } from './components/list-batches-expired/list-batches-expired.component';
import { StadisticsExpiredExistancesComponent } from './components/stadistics-expired-existances/stadistics-expired-existances.component';
import { StadisticsDamagedExistancesComponent } from './components/stadistics-damaged-existances/stadistics-damaged-existances.component';
import { ListBatchSoonTooExipreComponent } from './components/list-batch-soon-too-exipre/list-batch-soon-too-exipre.component';

@NgModule({
  declarations: [HomeComponent, ListBatchesByExistenceComponent, ListBatchesBySectionComponent,
    RegistrarLotesComponent, RegistrarRemitoComponent,CreateSectionComponent, ToastsComponent,
    ReservationListComponent, ListStockExistenciasComponent, ListBatchesExpiredComponent,
    RemitosHomeComponent, LotesHomeComponent, CreateControlReportComponent, BatchFinderModalComponent,
    ModifyStockControlComponent, ListControlStockComponent, ToastsContainer, StockControlsHomeComponent,
    StadisticsExpiredExistancesComponent, StadisticsDamagedExistancesComponent,ListBatchSoonTooExipreComponent],
  providers: [],
  imports: [
    CommonModule,
    FormsModule,
    NgbToast,
    ReactiveFormsModule,
    NgbToastModule,
    NgbNavModule,
    InventoryAppRoutingModule,
    NgbDropdownModule,
  ],
  exports: [
    HomeComponent,
    RouterModule
  ],
})
export class InventaryModule {
}
