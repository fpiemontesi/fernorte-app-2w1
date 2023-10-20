import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { ListaRemitosComponent } from './components/lista-remitos/lista-remitos.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent, ListaRemitosComponent],
  providers: [],
  imports: [CommonModule,
            FormsModule],
  exports: [HomeComponent],
})
export class InventaryModule {}
