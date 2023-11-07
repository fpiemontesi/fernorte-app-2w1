import { NgModule } from '@angular/core';
import {CommonModule, NgFor, NgIf, NgTemplateOutlet} from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { CreateControlReportComponent } from './components/stock-control-reports/create-control-report/create-control-report.component';
import { BatchFinderModalComponent } from './components/stock-control-reports/batch-finder-modal/batch-finder-modal.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ToastsContainer } from './components/toasts/toasts-container.component';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [HomeComponent, CreateControlReportComponent, BatchFinderModalComponent, ToastsContainer],
  providers: [],
    imports: [CommonModule, ReactiveFormsModule, NgbToastModule],
  exports: [HomeComponent],
})
export class InventaryModule {}
