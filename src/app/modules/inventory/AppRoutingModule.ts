import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
    ListControlStockComponent
} from "./components/stock-control-reports/list-control-stock/list-control-stock.component";
import {
    ModifyStockControlComponent
} from "./components/stock-control-reports/modify-stock-control/modify-stock-control.component";
import {
    CreateControlReportComponent
} from "./components/stock-control-reports/create-control-report/create-control-report.component";
import * as Inventory from "./components/home/home.component";
import {
    StockControlsHomeComponent
} from "./components/stock-control-reports/stock-controls-home/stock-controls-home.component";
const routes: Routes = [
    {
        path: 'inventory',
        component: Inventory.HomeComponent,
        children: [
            {
                path: 'stock-controls', component: StockControlsHomeComponent,
                children: [
                    {
                        path: '', component: ListControlStockComponent
                    },
                    {
                        path: 'list', component: ListControlStockComponent
                    },
                    {
                        path: 'modify', component: ModifyStockControlComponent
                    },
                    {
                        path: 'create', component: CreateControlReportComponent
                    }
                ]
            }
        ]
    }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
export const ArrayOfComponents = [ListControlStockComponent, ModifyStockControlComponent,
    CreateControlReportComponent]
