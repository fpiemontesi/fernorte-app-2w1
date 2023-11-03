import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './components/home/home.component';
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import { FormsModule } from '@angular/forms';
import { CreateTurnComponent } from './components/create-turn/create-turn.component';

@NgModule({
  declarations: [HomeComponent, CreateCustomerComponent, CreateTurnComponent],
  providers: [],
  imports: [CommonModule, FormsModule],
  exports: [HomeComponent],
})
export class CustomerModule {}
