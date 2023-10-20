import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { RegistrarLotesComponent } from './components/registrar-lotes/registrar-lotes.component';
import { FormsModule, NgModel } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent, RegistrarLotesComponent],
  providers: [],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [HomeComponent],
})
export class InventaryModule {}
