import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { RegistrarFacturaComponent } from './components/registrar-factura/registrar-factura.component';

@NgModule({
  declarations: [HomeComponent, RegistrarFacturaComponent],
  providers: [],
  imports: [CommonModule],
  exports: [HomeComponent],
})
export class InvoiceModule {}
