import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { ListBatchesByExistenceComponent } from './components/list-batches-by-existence/list-batches-by-existence.component';
import { ListBatchesBySectionComponent } from './components/list-batches-by-section/list-batches-by-section.component';
import { FormsModule } from '@angular/forms';
import { ToastsComponent } from './components/toasts/toasts.component';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [HomeComponent, ListBatchesByExistenceComponent, ListBatchesBySectionComponent, ToastsComponent],
  providers: [],
  imports: [CommonModule, FormsModule, NgbToast],
  exports: [HomeComponent],
})
export class InventaryModule {}
