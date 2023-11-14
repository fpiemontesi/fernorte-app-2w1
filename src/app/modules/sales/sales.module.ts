import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './components/home/home.component';
import { AltaVentaComponent } from './components/alta-venta/alta-venta.component';
import { ConsultarPresupuestoComponent } from './components/consultar-presupuesto/consultar-presupuesto.component';
import { ConsultarVentaComponent } from './components/consultar-venta/consultar-venta.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AltaPresupuestoComponent } from './components/alta-presupuesto/alta-presupuesto.component';
import { DetallesProductosComponent } from './components/detalles-productos/detalles-productos.component';
import { ModificarVentaComponent } from './components/modificar-venta/modificar-venta.component';
import { RouterModule, Routes } from '@angular/router';
import { ModificarPresupuestoComponent } from './components/modificar-presupuesto/modificar-presupuesto.component';


const routes: Routes = [
  {
    path: 'consultar-venta',
    component: ConsultarVentaComponent
  },
  {
    path: 'consultar-presupuesto',
    component: ConsultarPresupuestoComponent
  },
  {
    path: 'alta-presupuesto',
    component: AltaPresupuestoComponent
  },
  {
    path: 'modificar-presupuesto',
    component: ModificarPresupuestoComponent
  }

];

@NgModule({
  declarations: [
    HomeComponent,
    AltaVentaComponent,
    ConsultarPresupuestoComponent,
    ConsultarVentaComponent,
    AltaPresupuestoComponent,
    DetallesProductosComponent,
    ModificarVentaComponent,
    ModificarPresupuestoComponent,
  ],
  providers: [],
  imports: [CommonModule, HttpClientModule, FormsModule,RouterModule.forRoot(routes)],
  exports: [HomeComponent, RouterModule],
})
export class SalesModule {}
