import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './components/home/home.component';
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import { FormsModule } from '@angular/forms';
import { UpdateCustomerComponent } from './components/update-customer/update-customer.component';

@NgModule({
  declarations: [HomeComponent, CreateCustomerComponent, UpdateCustomerComponent],
  providers: [],
  imports: [CommonModule, FormsModule],
  exports: [HomeComponent],
})
export class CustomerModule {}
