import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { ModificarExistenciaComponent } from './components/modificar-existencia/modificar-existencia.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent
    , ModificarExistenciaComponent, ModificarExistenciaComponent],
  providers: [],
  imports: [CommonModule, 
    FormsModule, 
    NgbNavModule],
  exports: [HomeComponent],
})
export class InventaryModule {}
