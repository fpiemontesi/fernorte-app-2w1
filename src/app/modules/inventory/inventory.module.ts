import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { RegistrarLotesComponent } from './components/registrar-lotes/registrar-lotes.component';
import { FormsModule } from '@angular/forms';
import { ToastsComponent } from './components/toast/toasts.component';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [HomeComponent, RegistrarLotesComponent, ToastsComponent],
  providers: [],
  imports: [
    CommonModule,
    FormsModule,
    NgbToast
  ],
  exports: [HomeComponent],
})
export class InventaryModule {}
