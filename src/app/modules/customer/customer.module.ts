import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './components/home/home.component';
import { CrearClienteComponent } from './components/crear-cliente/crear-cliente.component';
import { CrearPositionComponent } from './components/crear-position/crear-position.component';
import { CrearUserComponent } from './components/crear-user/crear-user.component';
import { DeleteUserComponent } from './components/delete-user/delete-user.component';
import { GetUserComponent } from './components/get-user/get-user.component';
import { ListaClientesComponent } from './components/lista-clientes/lista-clientes.component';
import { ListaTurneroComponent } from './components/lista-turnero/lista-turnero.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ModificarClientesComponent } from './components/modificar-clientes/modificar-clientes.component';
import { TurneroComponent } from './components/turnero/turnero.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GetBenefitsComponent } from './components/get-benefits/get-benefits.component';
import { GetCustomersPointsComponent } from './components/get-customers-points/get-customers-points.component';

@NgModule({
  declarations: [HomeComponent, CrearClienteComponent, CrearPositionComponent, CrearUserComponent, DeleteUserComponent, GetUserComponent, ListaClientesComponent, ListaTurneroComponent, LoginComponent, LogoutComponent, ModificarClientesComponent, TurneroComponent, GetBenefitsComponent, GetCustomersPointsComponent],
  providers: [],
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  exports: [HomeComponent],
})
export class CustomerModule {}
