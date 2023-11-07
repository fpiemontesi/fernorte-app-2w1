import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { RegistrarFacturaComponent } from './components/registrar-factura/registrar-factura.component';
import { GestionFacturaComponent } from './components/gestion-factura/gestion-factura.component';
import { PendingOrdersComponent } from './components/pending-orders/pending-orders.component';
import { RegistrarPagoComponent } from './components/registrar-pago/registrar-pago.component';
import { FormPagoComponent } from './components/form-pago/form-pago.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailsModalComponent } from './components/details-modal/details-modal.component';
import { RouterModule, Routes } from '@angular/router';
import { ReportesComponent } from './components/reportes/reportes.component';

const routes: Routes = [
  {
    path: 'ConsultarPedidos',
    children: [
      { path: '', component: PendingOrdersComponent },
      {
        path: 'RegistrarFactura/:id',
        children: [
          { path: '', component: RegistrarFacturaComponent },
          { path: 'DetalleFactura', component: DetailsModalComponent },
        ],
      },
    ],
  },

  { path: 'GestionarFactura', component: GestionFacturaComponent },
  { path: 'Reportes', component: ReportesComponent },
];

@NgModule({
  declarations: [
    HomeComponent,
    RegistrarFacturaComponent,
    PendingOrdersComponent,
    GestionFacturaComponent,
    RegistrarPagoComponent,
    FormPagoComponent,
    DetailsModalComponent,
  ],

  providers: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
  ],
  exports: [HomeComponent, RouterModule],
})
export class InvoiceModule {}
