import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { CreateSectionComponent } from './components/sections/create-section/create-section.component';
import {FormsModule} from "@angular/forms";
import { ToastsComponent } from './components/toasts/toasts.component';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [HomeComponent, CreateSectionComponent, ToastsComponent],
  providers: [],
  imports: [CommonModule, FormsModule, NgbToast],
  exports: [HomeComponent],
})
export class InventaryModule {}
