import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './components/home/home.component';
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import { FormsModule } from '@angular/forms';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { DeleteUserComponent } from './components/delete-user/delete-user.component';

@NgModule({
  declarations: [HomeComponent, CreateCustomerComponent, CreateUserComponent, DeleteUserComponent],
  providers: [],
  imports: [CommonModule, FormsModule],
  exports: [HomeComponent],
})
export class CustomerModule {}
