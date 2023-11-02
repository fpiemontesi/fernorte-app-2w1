import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from '../../app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { CrearPedidoCotizacionComponent } from './components/crear-pedido-cotizacion/crear-pedido-cotizacion.component';

@NgModule({
  declarations: [HomeComponent, CrearPedidoCotizacionComponent],
  providers: [],
  imports: [CommonModule,
    BrowserModule, 
    FormsModule, 
    AppRoutingModule, 
    NgbModule],
  exports: [HomeComponent],
})
export class PurchaseModule {}
