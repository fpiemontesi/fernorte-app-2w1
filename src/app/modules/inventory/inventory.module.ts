import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { RegistrarRemitoComponent } from './components/remito/registrar-remito/registrar-remito.component';
import { FormsModule } from '@angular/forms';
import { ToastsComponent } from './components/toasts/toasts.component';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [HomeComponent, RegistrarRemitoComponent, ToastsComponent],
  providers: [],
  imports: [CommonModule, FormsModule, NgbToast],
  exports: [HomeComponent],
})
export class InventaryModule {}
