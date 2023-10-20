import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './components/home/home.component';
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent, CreateCustomerComponent],
  providers: [],
  imports: [CommonModule, FormsModule],
  exports: [HomeComponent],
})
export class CustomerModule {}
