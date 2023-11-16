import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {RemitosHomeComponent} from "./components/remitos/remitos-home/remitos-home.component";
import {RegistrarRemitoComponent} from "./components/remitos/registrar-remito/registrar-remito.component";
import {LotesHomeComponent} from "./components/lotes/lotes-home/lotes-home.component";
import {RegistrarLotesComponent} from "./components/lotes/registrar-lotes/registrar-lotes.component";

const routes: Routes = [
  {
    path: 'inventory',
    component: HomeComponent,
    children: [
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
