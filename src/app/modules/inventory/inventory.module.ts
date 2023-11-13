import { NgModule } from '@angular/core';
import {CommonModule, NgFor, NgIf, NgTemplateOutlet} from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { CreateControlReportComponent } from './components/stock-control-reports/create-control-report/create-control-report.component';
import { BatchFinderModalComponent } from './components/stock-control-reports/batch-finder-modal/batch-finder-modal.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ToastsContainer } from './components/toasts/toasts-container.component';
import {NgbToast, NgbToastModule} from '@ng-bootstrap/ng-bootstrap';
import {
  ModifyStockControlComponent
} from "./components/stock-control-reports/modify-stock-control/modify-stock-control.component";

@NgModule({
  declarations: [HomeComponent, CreateControlReportComponent, BatchFinderModalComponent,
    ModifyStockControlComponent, ToastsContainer],
  providers: [],
    imports: [CommonModule, ReactiveFormsModule, NgbToast, NgbToastModule],
  exports: [HomeComponent],
})
export class InventaryModule {}
