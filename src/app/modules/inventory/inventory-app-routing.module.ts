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
import { ListarExistenciasComponent } from './components/existences/listar-existencias/listar-existencias.component';
import { ListStockExistenciasComponent } from './components/list-stock-existencias/list-stock-existencias.component';
import { ExistenceHomeComponent } from './components/existences/existence-home/existence-home.component';

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
            path: '', component: ListControlStockComponent
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
            path: 'registrar', component: RegistrarRemitoComponent
          }
        ]
      },
      {
        path: 'existencias',
        component: ExistenceHomeComponent,
        children: [
          {
            path: 'listar', component: ListarExistenciasComponent
          },
          {
            path: 'stock-total', component: ListStockExistenciasComponent
          }
        ]
      },
      {
        path: 'lotes',
        component: LotesHomeComponent,
        children: [
          {
            path: 'registrar', component: RegistrarLotesComponent
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
