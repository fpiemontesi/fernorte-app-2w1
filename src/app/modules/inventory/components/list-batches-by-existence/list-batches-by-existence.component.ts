import { Component, OnDestroy, OnInit } from '@angular/core';
import { batch } from '../../models/batch';
import { Subscription } from 'rxjs';
import { BatchService } from '../../services/batch.service';
import { AppToastService } from '../../services/app-toast.service';

@Component({
  selector: 'fn-list-batches-by-existence',
  templateUrl: './list-batches-by-existence.component.html',
  styleUrls: ['./list-batches-by-existence.component.css']
})
export class ListBatchesByExistenceComponent implements OnInit, OnDestroy{
 batches: batch[] = [];
 batchesFiltered: batch[] = [];
 existenceId!: string; 
 private subscriptions = new Subscription();

 constructor(private batchService: BatchService, private toastService: AppToastService) { }

 ngOnInit(): void {
   this.subscriptions.add(
     this.batchService.getAll().subscribe({
       next: (response: batch[]) => {
         this.batches = response;
       },
       error: (err) => {
         console.log(err);
       }
     })
   );
 }

 ngOnDestroy(): void {
   this.subscriptions.unsubscribe();
 }

 filterBatches(): void {
  if (this.existenceId) {
    this.batchesFiltered = this.batches.filter(batch => batch.id_existence === this.existenceId);

    if (this.batchesFiltered.length === 0) {
      this.toastService.show('No se encontraron lotes', 'No se encontraron lotes con el ID Existencia seleccionado');
    }
  } else {
    this.batchesFiltered = [];
  }
}
}
