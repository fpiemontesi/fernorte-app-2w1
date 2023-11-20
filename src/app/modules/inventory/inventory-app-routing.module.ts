import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {
  StockControlsHomeComponent
} from "./components/stock-control-reports/stock-controls-home/stock-controls-home.component";
import {
  CreateControlReportComponent
} from "./components/stock-control-reports/create-control-report/create-control-report.component";
import {
  ListControlStockComponent
} from "./components/stock-control-reports/list-control-stock/list-control-stock.component";
import {
  ModifyStockControlComponent
} from "./components/stock-control-reports/modify-stock-control/modify-stock-control.component";
import {RemitosHomeComponent} from "./components/remitos/remitos-home/remitos-home.component";
import {RegistrarRemitoComponent} from "./components/remitos/registrar-remito/registrar-remito.component";
import {LotesHomeComponent} from "./components/batches/lotes-home/lotes-home.component";
import {RegistrarLotesComponent} from "./components/batches/registrar-lotes/registrar-lotes.component";
import { ListBatchSoonTooExipreComponent } from './components/batches/list-batch-soon-too-exipre/list-batch-soon-too-exipre.component';
import { ListBatchesExpiredComponent } from './components/batches/list-batches-expired/list-batches-expired.component';
import { ListBatchesByExistenceComponent } from './components/batches/list-batches-by-existence/list-batches-by-existence.component';
import { ListBatchesBySectionComponent } from './components/batches/list-batches-by-section/list-batches-by-section.component';
import { reservation } from './models/reservation';
import { ReservationHomeComponent } from './components/reservations/reservation-home/reservation-home.component';
import { ReservationListComponent } from './components/reservations/reservation-list/reservation-list.component';
import { SectionHomeComponent } from './components/sections/section-home/section-home.component';
import { CreateSectionComponent } from './components/sections/create-section/create-section.component';
import { ExistanceHomeComponent } from './components/existances/existance-home/existance-home.component';
import { RegistrarExistenciaComponent } from './components/existances/registrar-existencia/registrar-existencia.component';
import { ListStockExistenciasComponent } from './components/existances/list-stock-existencias/list-stock-existencias.component';
import { StadisticsDamagedExistancesComponent } from './components/reports/stadistics-damaged-existances/stadistics-damaged-existances.component';
import { StadisticsExpiredExistancesComponent } from './components/reports/stadistics-expired-existances/stadistics-expired-existances.component';
import { ReportHomeComponent } from './components/reports/report-home/report-home.component';
import { VoidShowComponent } from './components/void-show/void-show.component';

const routes: Routes = [
  {
    path: 'inventory',
    component: HomeComponent,
    children: [
      {
        path: 'controles',
        component: StockControlsHomeComponent,
        children: [
          {
            path: '', component: VoidShowComponent
          },
          {
            path: 'listar', component: ListControlStockComponent
          },
          {
            path: 'crear', component: CreateControlReportComponent
          },
          {
            path: 'modificar', component: ModifyStockControlComponent
          },
        ]
      },
      {
        path: 'remitos',
        component: RemitosHomeComponent,
        children: [
          {
            path: '', component: VoidShowComponent
          },
          {
            path: 'registrar', component: RegistrarRemitoComponent
          }
        ]
      },
      {
        path: 'reservaciones',
        component: ReservationHomeComponent,
        children: [
          {
            path: '', component: VoidShowComponent
          },
          {
            path: 'listar', component: ReservationListComponent
          }
        ]
      },
      {
        path: 'lotes',
        component: LotesHomeComponent,
        children: [
          {
            path: '', component: VoidShowComponent
          },
          {
            path: 'registrar', component: RegistrarLotesComponent
          },
          {
            path: 'listar/prontoAExpirar', component: ListBatchSoonTooExipreComponent
          },
          {
            path: 'listar/prontoExpirado', component: ListBatchesExpiredComponent
          },
          {
            path: 'listar/porExistencia', component: ListBatchesByExistenceComponent
          },
          {
            path: 'listar/porSeccion', component: ListBatchesBySectionComponent
          },
        ]
      },
      {
        path: 'secciones',
        component: SectionHomeComponent,
        children: [
          {
            path: '', component: VoidShowComponent
          },
          {
            path: 'registrar', component: CreateSectionComponent
          }
        ]
      },
      {
        path: 'existencias',
        component: ExistanceHomeComponent,
        children: [
          {
            path: '', component: VoidShowComponent
          },
          {
            path: 'registrar', component: RegistrarExistenciaComponent
          },
          
          {
            path: 'listar', component: ListStockExistenciasComponent
          }
        ]
      },
      {
        path: 'estadisticas',
        component: ReportHomeComponent,
        children: [
          {
            path: '', component: VoidShowComponent
          },
          {
            path: 'dañados', component: StadisticsDamagedExistancesComponent
          },
          
          {
            path: 'vencidos', component: StadisticsExpiredExistancesComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class InventoryAppRoutingModule {}
