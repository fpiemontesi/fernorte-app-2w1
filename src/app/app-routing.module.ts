import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultarVentaComponent } from './modules/sales/components/consultar-venta/consultar-venta.component';
import { ModificarVentaComponent } from './modules/sales/components/modificar-venta/modificar-venta.component';

const routes: Routes = [
  {
    path: 'consultar-venta',
    component: ConsultarVentaComponent
  },
  {
    path: 'modificar-venta/:id',
    component: ModificarVentaComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

