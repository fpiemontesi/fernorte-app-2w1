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
import { AppRoutingModule } from 'src/app/modules/sales/app-routing.module';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'consultar-venta',
    component: ConsultarVentaComponent
  },
  {
    path: 'modificar-venta',
    component: ModificarVentaComponent
  },
  {
    path: 'consultar-presupuesto',
    component: ConsultarPresupuestoComponent
  },
  {
    path: 'alta-presupuesto',
    component: AltaPresupuestoComponent
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
  ],
  providers: [],
  imports: [CommonModule, HttpClientModule, FormsModule,RouterModule.forRoot(routes)],
  exports: [HomeComponent, RouterModule],
})
export class SalesModule {}
