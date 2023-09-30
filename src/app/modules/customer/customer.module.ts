import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [HomeComponent],
  providers: [],
  imports: [CommonModule],
  exports: [HomeComponent],
})
export class CustomerModule {}
