import { Component, OnDestroy, OnInit } from '@angular/core';
import { Batch } from '../../models/batch';
import { BatchService } from '../../services/batch.service';
import { Subscription } from 'rxjs';
import { AppToastService } from '../../services/app-toast.service';

@Component({
  selector: 'fn-list-batches-by-section',
  templateUrl: './list-batches-by-section.component.html',
  styleUrls: ['./list-batches-by-section.component.css']
})
export class ListBatchesBySectionComponent implements OnInit, OnDestroy{
  batches: Batch[] = [];
  batchesFiltered: Batch[] = [];
  sectionId!: string;
  private subscriptions = new Subscription();

  constructor(private batchService: BatchService, private toastService: AppToastService) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.batchService.getAll().subscribe({
        next: (response: Batch[]) => {
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

  filterBatchesBySection(): void {
    if (this.sectionId) {
      this.batchesFiltered = this.batches.filter(batch => batch.sectionId === this.sectionId);

      if (this.batchesFiltered.length === 0) {
        this.toastService.show('No se encontraron lotes', 'No se encontraron lotes con el ID Sección seleccionado');
      }
    } else {
      this.batchesFiltered = [];
    }
  }
}

