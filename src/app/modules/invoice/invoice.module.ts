import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { DeleteFacturaComponent } from './components/delete-factura/delete-factura.component';

@NgModule({
  declarations: [HomeComponent, DeleteFacturaComponent],
  providers: [],
  imports: [CommonModule],
  exports: [HomeComponent],
})
export class InvoiceModule {}
