import { NgModule } from '@angular/core';
import { CommonModule, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { ReservationListComponent } from './components/reservation-list/reservation-list.component';
import { ListBatchesByExistenceComponent } from './components/list-batches-by-existence/list-batches-by-existence.component';
import { ListBatchesBySectionComponent } from './components/list-batches-by-section/list-batches-by-section.component';
import { RegistrarRemitoComponent } from './components/remito/registrar-remito/registrar-remito.component';
import { RegistrarLotesComponent } from './components/registrar-lotes/registrar-lotes.component';
import { FormsModule } from '@angular/forms';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';
import {
    CreateControlReportComponent
} from './components/stock-control-reports/create-control-report/create-control-report.component';
import {
    BatchFinderModalComponent
} from './components/stock-control-reports/batch-finder-modal/batch-finder-modal.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ToastsContainer} from './components/toasts/toasts-container.component';
import {NgbNav, NgbNavContent, NgbNavItem, NgbNavLinkButton, NgbToastModule} from '@ng-bootstrap/ng-bootstrap';
import {
    ModifyStockControlComponent
} from "./components/stock-control-reports/modify-stock-control/modify-stock-control.component";
import {
    ListControlStockComponent
} from "./components/stock-control-reports/list-control-stock/list-control-stock.component";
import { StockControlsHomeComponent } from './components/stock-control-reports/stock-controls-home/stock-controls-home.component';
import {InventoryAppRoutingModule} from "./inventory-app-routing.module";
import {ToastsComponent} from "./components/toast/toasts.component";

@NgModule({
  declarations: [HomeComponent, ListBatchesByExistenceComponent, ListBatchesBySectionComponent,
                 RegistrarLotesComponent, RegistrarRemitoComponent, ToastsComponent, ReservationListComponent,
                 CreateControlReportComponent, BatchFinderModalComponent,
                 ModifyStockControlComponent, ListControlStockComponent, ToastsContainer, StockControlsHomeComponent],
  providers: [],
  imports: [
    CommonModule,
    FormsModule,
    NgbToast,
    InventoryAppRoutingModule,
    ReactiveFormsModule,
    NgbToastModule,
    NgbNav,
    NgbNavItem,
    NgbNavLinkButton,
    NgbNavContent
  ],
  exports: [HomeComponent],
})
export class InventaryModule {
}
