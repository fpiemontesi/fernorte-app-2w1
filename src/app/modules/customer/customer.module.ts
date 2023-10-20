import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './components/home/home.component';
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import { FormsModule } from '@angular/forms';
import { GetCustomersComponent } from './components/get-customers/get-customers.component';

@NgModule({
  declarations: [HomeComponent, CreateCustomerComponent, GetCustomersComponent],
  providers: [],
  imports: [CommonModule, FormsModule],
  exports: [HomeComponent],
})
export class CustomerModule {}
