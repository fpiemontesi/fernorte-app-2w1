import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { RegistrarRemitoComponent } from './components/remito/registrar-remito/registrar-remito.component';
import { RegistrarLotesComponent } from './components/registrar-lotes/registrar-lotes.component';
import { FormsModule } from '@angular/forms';
import { ToastsComponent } from './components/toast/toasts.component';
import { NgbDropdownModule, NgbNavModule, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'inventory/remitos/registrar',
    component: RegistrarRemitoComponent,
  },
  {
    path: 'inventory/lotes/registrar',
    component: RegistrarLotesComponent,
  },
];

@NgModule({
  declarations: [HomeComponent, RegistrarLotesComponent, RegistrarRemitoComponent, ToastsComponent],
  providers: [],
  imports: [
    CommonModule,
    FormsModule,
    NgbToast,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    NgbNavModule,
    NgbDropdownModule
  ],
  exports: [
    HomeComponent,
    RouterModule
  ],
})
export class InventaryModule {}
