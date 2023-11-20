import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {RemitosHomeComponent} from "./components/remitos/remitos-home/remitos-home.component";
import {RegistrarRemitoComponent} from "./components/remitos/registrar-remito/registrar-remito.component";
import {LotesHomeComponent} from "./components/batches/lotes-home/lotes-home.component";
import {RegistrarLotesComponent} from "./components/batches/registrar-lotes/registrar-lotes.component";
import { CreateSectionComponent } from './components/sections/create-section/create-section.component';
import { ExistencesHomeComponent } from './components/existences/existences-home/existences-home.component';
import { ListStockExistenciasComponent } from './components/existences/list-stock-existencias/list-stock-existencias.component';
import { ReservationListComponent } from './components/reservations/reservation-list/reservation-list.component';
import { ReservationsHomeComponent } from './components/reservations/reservations-home/reservations-home.component';
import { ListBatchesByExistenceComponent } from './components/batches/list-batches-by-existence/list-batches-by-existence.component';
import { ListBatchesBySectionComponent } from './components/batches/list-batches-by-section/list-batches-by-section.component';

const routes: Routes = [
  {
    path: 'inventory',
    component: HomeComponent,
    children: [
      {
        path: 'secciones',
        component: CreateSectionComponent,
      },
      {
        path: 'existencias',
        component: ExistencesHomeComponent,
        children: [
          {
            path: 'listar', component: ListStockExistenciasComponent
          }
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
        path: 'lotes',
        component: LotesHomeComponent,
        children: [
          {
            path: 'registrar', component: RegistrarLotesComponent
          },
          {
            path: 'listar-por-existencia', component: ListBatchesByExistenceComponent
          },
          {
            path: 'listar-por-seccion', component: ListBatchesBySectionComponent
          }
        ]
      }
      ,
      {
        path: 'reservas',
        component: ReservationsHomeComponent,
        children: [
          {
            path: 'listar', component: ReservationListComponent
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
