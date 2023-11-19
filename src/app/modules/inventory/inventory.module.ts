import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { ModificarExistenciaComponent } from './components/modificar-existencia/modificar-existencia.component';
import { NgbNavModule, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ListarExistenciasComponent } from './components/listar-existencias/listar-existencias.component';
import { RouterModule, Routes } from '@angular/router';
import { ExistenciasService } from './services/existance.service';
import { ListStockExistenciasComponent } from './components/list-stock-existencias/list-stock-existencias.component';
import { ReservationListComponent } from './components/reservation-list/reservation-list.component';
import { ListBatchesByExistenceComponent } from './components/list-batches-by-existence/list-batches-by-existence.component';
import { ListBatchesBySectionComponent } from './components/list-batches-by-section/list-batches-by-section.component';
import { RegistrarRemitoComponent } from './components/remito/registrar-remito/registrar-remito.component';
import { RegistrarLotesComponent } from './components/registrar-lotes/registrar-lotes.component';
import { ToastsComponent } from './components/toast/toasts.component';

const routes: Routes = [
  {
    path: 'inventory',
    component: HomeComponent,
    children: [
      {
        path: 'listar-existencias',
        component: ListarExistenciasComponent,
      },
      {
        path: 'modificar-existencia/:id',
        component: ModificarExistenciaComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    HomeComponent,
    ModificarExistenciaComponent,
    ListarExistenciasComponent, ListBatchesByExistenceComponent, ListBatchesBySectionComponent, 
    RegistrarLotesComponent, RegistrarRemitoComponent, ToastsComponent, ReservationListComponent, ListStockExistenciasComponent
  ],
  providers: [ExistenciasService],
  imports: [
    CommonModule,
    FormsModule,
    NgbNavModule,
    RouterModule.forChild(routes),
    NgbToast,
  ],
  exports: [HomeComponent, RouterModule],

})
export class InventaryModule {}
