import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { ModificarExistenciaComponent } from './components/modificar-existencia/modificar-existencia.component';
import { NgbNavModule, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ListarExistenciasComponent } from './components/listar-existencias/listar-existencias.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'inventory',
    component: HomeComponent
  },
  {
    path: 'inventory/listar-existencias',
    component: ListarExistenciasComponent
  },
  {
    path: 'inventory/modificar-existencia/:id',
    component: ModificarExistenciaComponent
  },
];

@NgModule({
  declarations: [HomeComponent,
    ModificarExistenciaComponent, 
    ListarExistenciasComponent],
  providers: [],
  imports: [CommonModule, 
    FormsModule, 
    NgbNavModule,
    RouterModule.forRoot(routes),
    NgbToast
  ],
  exports: [HomeComponent,
    RouterModule],
})
export class InventaryModule {}
