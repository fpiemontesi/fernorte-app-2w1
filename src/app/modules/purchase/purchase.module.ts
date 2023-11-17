import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from '../../app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { CrearPedidoCotizacionComponent } from './components/crear-pedido-cotizacion/crear-pedido-cotizacion.component';
import { VerOrdenesDeCompraComponent } from './components/ver-ordenes-de-compra/ver-ordenes-de-compra.component';
import { VerOrdenCompraComponent } from './components/ver-orden-compra/ver-orden-compra.component';
import { VerPedidosCotizacionComponent } from './components/ver-pedidos-cotizacion/ver-pedidos-cotizacion.component';
import { VerPedidoCotizacionComponent } from './components/ver-pedido-cotizacion/ver-pedido-cotizacion.component';
import { ProveedoresComponent } from './components/proveedor/proveedores/proveedores.component';
import { CrearComponent } from './components/proveedor/modals/crear/crear.component';
import { ModificarComponent } from './components/proveedor/modals/modificar/modificar.component';
import { EliminarComponent } from './components/proveedor/modals/eliminar/eliminar.component';
import { ModalCatalogoProveedoresComponent } from './components/proveedor/modals/catalogo/modal-catalogo-proveedores.component';
import { CrearOrdenCompraComponent } from './components/crear-orden-compra/crear-orden-compra.component';

@NgModule({
  declarations: [
    HomeComponent,
    CrearPedidoCotizacionComponent,
    VerOrdenesDeCompraComponent,
    VerOrdenCompraComponent,
    VerPedidosCotizacionComponent,
    VerPedidoCotizacionComponent,
    ProveedoresComponent,
    CrearComponent,
    ModificarComponent,
    EliminarComponent,
    ModalCatalogoProveedoresComponent,
    CrearOrdenCompraComponent,
  ],
  providers: [],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
  ],
  exports: [HomeComponent],
})
export class PurchaseModule {}
