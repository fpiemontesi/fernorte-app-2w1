import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './components/home/home.component';
import { GenerateInvoiceComponent } from './generate-invoice/generate-invoice.component';

@NgModule({
  declarations: [HomeComponent, GenerateInvoiceComponent],
  imports: [CommonModule],
  exports: [HomeComponent],
})
export class CustomerModule {}
