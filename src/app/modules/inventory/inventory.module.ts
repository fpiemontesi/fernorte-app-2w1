import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { ModifyStockControlComponent } from './components/stockControl/modify-stock-control/modify-stock-control.component';
import { ToastsComponent } from './components/toasts/toasts.component';

@NgModule({
  declarations: [HomeComponent, ModifyStockControlComponent, ToastsComponent],
  providers: [],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbToast],
  exports: [HomeComponent],
})
export class InventaryModule {}
