import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { RegistrarExistenciaComponent } from './components/registrar-existencia/registrar-existencia.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent, RegistrarExistenciaComponent],
  providers: [],
  imports: [CommonModule, FormsModule],
  exports: [HomeComponent],
})
export class InventaryModule {}
