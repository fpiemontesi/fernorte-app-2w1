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
import { PaymentsMethodsModalComponent } from './components/payments-methods-modal/payments-methods-modal.component';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastsContainer } from "./components/toasts/toasts-container.component";
import { ReporteHomeComponent } from './components/reportes/reporte-home/reporte-home.component';
import { ReporteFormaDePagoComponent } from './components/reportes/reporte-forma-de-pago/reporte-forma-de-pago.component';
import { ReporteClientesComponent } from './components/reportes/reporte-clientes/reporte-clientes.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { ClientsConsumePieChartComponent } from './components/reportes/ClientsConsumePieChart/ClientsConsumePieChart.component';
import { MonthsBilledColsChartComponent } from './components/reportes/monthsBilledColsChart/monthsBilledColsChart.component';

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
  {
    path: 'Reportes',
    component: ReporteHomeComponent,
    children: [
      { path: '', redirectTo: 'Clientes', pathMatch: 'full' }, 
      { path: 'Clientes', component: ReporteClientesComponent },
    ],
  },
  {path: 'paymentMethods', component: PaymentsMethodsModalComponent}
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
        PaymentsMethodsModalComponent,
        ReporteHomeComponent,
        ReporteFormaDePagoComponent,
        ReporteClientesComponent,
        OrderDetailComponent,
        ClientsConsumePieChartComponent,
        MonthsBilledColsChartComponent
    ],
    providers: [],
    exports: [HomeComponent, RouterModule],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forRoot(routes),
        ReactiveFormsModule,
        NgbToastModule,
        NgbTooltipModule,
        ToastsContainer
    ]
})
export class InvoiceModule {}
