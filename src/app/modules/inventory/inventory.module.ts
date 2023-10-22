import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { CreateSectionComponent } from './components/sections/create-section/create-section.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [HomeComponent, CreateSectionComponent],
  providers: [],
  imports: [CommonModule, FormsModule],
  exports: [HomeComponent],
})
export class InventaryModule {}
