import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './components/home/home.component';
import { AltaVentaComponent } from './components/alta-venta/alta-venta.component';
import { ConsultarPresupuestoComponent } from './components/consultar-presupuesto/consultar-presupuesto.component';
import { ConsultarVentaComponent } from './components/consultar-venta/consultar-venta.component';
import { AltaPresupuestoComponent } from './components/alta-presupuesto/alta-presupuesto.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent, AltaVentaComponent, ConsultarPresupuestoComponent, ConsultarVentaComponent, AltaPresupuestoComponent],
  providers: [],
  imports: [CommonModule, 
            HttpClientModule,
            FormsModule,],
  exports: [HomeComponent],
})
export class SalesModule {}
