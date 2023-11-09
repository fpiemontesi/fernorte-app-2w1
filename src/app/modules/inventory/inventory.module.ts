import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { ModificarRemitoComponent } from './components/remito/modificar-remito/modificar-remito.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastsComponent } from './components/toasts/toasts.component';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [HomeComponent, ModificarRemitoComponent, ToastsComponent],
  providers: [],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbToast],
  exports: [HomeComponent],
})
export class InventaryModule {}
