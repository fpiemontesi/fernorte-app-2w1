import {NgModule} from '@angular/core';
import {CommonModule, NgFor, NgIf, NgTemplateOutlet} from '@angular/common';
import {HomeComponent} from './components/home/home.component';
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

@NgModule({
    declarations: [HomeComponent, CreateControlReportComponent, BatchFinderModalComponent,
        ModifyStockControlComponent, ListControlStockComponent, ToastsContainer, StockControlsHomeComponent],
    providers: [],
    imports: [CommonModule,
      InventoryAppRoutingModule,
      ReactiveFormsModule,
      NgbToastModule,
      NgbNav,
      NgbNavItem,
      NgbNavLinkButton,
      NgbNavContent],
    exports: [HomeComponent],
})
export class InventaryModule {
}
