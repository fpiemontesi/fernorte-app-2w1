import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './components/home/home.component';
import { ProveedoresComponent } from './components/proveedor/proveedores/proveedores.component';
import { CrearComponent } from './components/proveedor/modals/crear/crear.component';
import { ModificarComponent } from './components/proveedor/modals/modificar/modificar.component';
import { EliminarComponent } from './components/proveedor/modals/eliminar/eliminar.component';

@NgModule({
  declarations: [HomeComponent, ProveedoresComponent, CrearComponent, ModificarComponent, EliminarComponent],
  providers: [],
  imports: [CommonModule],
  exports: [HomeComponent],
})
export class PurchaseModule {}
