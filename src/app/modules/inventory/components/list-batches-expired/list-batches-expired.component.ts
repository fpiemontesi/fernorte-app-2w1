import { Component, OnDestroy, OnInit } from '@angular/core';
import { Batch } from '../../models/batch';
import { BatchService } from '../../services/batch.service';
import { Subscription } from 'rxjs';
import { AppToastService } from '../../services/app-toast.service';
@Component({
  selector: 'app-list-batches-expired',
  templateUrl: './list-batches-expired.component.html',
  styleUrls: ['./list-batches-expired.component.css']
})
export class ListBatchesExpiredComponent implements OnInit, OnDestroy {
  batches: Batch[] = [];
  private subscriptions = new Subscription();

  constructor(private batchService: BatchService, private toastService: AppToastService) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.batchService.getExpired().subscribe({
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
  eliminar(batch:Batch){
    
    this.subscriptions.add(
      this.batchService.delete(batch.id).subscribe({
        next: (response: Batch) => {
          this.toastService.show("Exito","Elemento eliminado")
          this.ngOnInit();
        },
        error: (err) => {
          console.log(err);
        }
      })
    );
  }
}
