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
