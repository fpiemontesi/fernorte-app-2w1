import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
<<<<<<< Updated upstream
import { DeleteFacturaComponent } from './components/delete-factura/delete-factura.component';

@NgModule({
  declarations: [HomeComponent, DeleteFacturaComponent],
=======
import { InvoiceDetailComponent } from './components/invoice-detail/invoice-detail.component';

@NgModule({
  declarations: [HomeComponent, InvoiceDetailComponent],
>>>>>>> Stashed changes
  providers: [],
  imports: [CommonModule],
  exports: [HomeComponent],
})
export class InvoiceModule {}
