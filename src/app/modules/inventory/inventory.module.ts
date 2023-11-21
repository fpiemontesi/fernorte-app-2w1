import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';

import { ReservationListComponent } from './components/reservations/reservation-list/reservation-list.component';
import { ListBatchesByExistenceComponent } from './components/batches/list-batches-by-existence/list-batches-by-existence.component';
import { RegistrarRemitoComponent } from './components/remito/registrar-remito/registrar-remito.component';
import { RegistrarLotesComponent } from './components/batches/registrar-lotes/registrar-lotes.component';
import { FormsModule } from '@angular/forms';
import { ToastsComponent } from './components/toast/toasts.component';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';
<<<<<<< HEAD
import { ModificarLoteComponent } from './components/modificar-lote/modificar-lote.component';

@NgModule({

  declarations: [HomeComponent, ListBatchesByExistenceComponent, ListBatchesBySectionComponent, 
                 RegistrarLotesComponent, RegistrarRemitoComponent, ToastsComponent, ReservationListComponent,
                 ModificarLoteComponent],
=======
import { CreateSectionComponent } from './components/sections/create-section/create-section.component';
import { ListBatchesBySectionComponent } from './components/batches/list-batches-by-section/list-batches-by-section.component';

@NgModule({
  declarations: [HomeComponent, ListBatchesByExistenceComponent, ListBatchesBySectionComponent,
                 RegistrarLotesComponent, RegistrarRemitoComponent,CreateSectionComponent, ToastsComponent, ReservationListComponent],
>>>>>>> a1a717f67d219c416745a5788c452c6ffaff36c0
  providers: [],
  imports: [
    CommonModule,
    FormsModule,
    NgbToast
  ],
  exports: [HomeComponent],
})
export class InventaryModule {}
