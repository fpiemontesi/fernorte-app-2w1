import { Component } from '@angular/core';
import { Batch } from '../../../models/batch';
import { BatchService } from '../../../services/batch.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'fn-list-batch-soon-too-exipre',
  templateUrl: './list-batch-soon-too-exipre.component.html',
  styleUrls: ['./list-batch-soon-too-exipre.component.css']
})
export class ListBatchSoonTooExipreComponent {
    listaLotesProntoExpirar : Batch[] = [];
    private subscription = new Subscription();

    constructor(private batchService : BatchService){}

    ngOnInit(){
      this.subscription.add(
        this.batchService.getSoonToExpire().subscribe({
          next: (lotes : Batch[]) => {
            this.listaLotesProntoExpirar = lotes;
          },
          error: () => {
            console.error();
          }
        })
      )
    }
}

