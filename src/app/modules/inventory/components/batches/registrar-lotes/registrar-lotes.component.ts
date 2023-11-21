import { Component, OnDestroy, OnInit } from '@angular/core';
import { Batch } from '../../../models/batch';
import { Existence } from '../../../models/existence';
import { Section } from '../../../models/section';
import { Subscription } from 'rxjs';
import { SectionService } from '../../../services/section.service';
import { ExistenceService } from '../../../services/existence.service';
import { BatchService } from '../../../services/batch.service';
import { AppToastService } from '../../../services/app-toast.service';

@Component({
  selector: 'fn-registrar-lotes',
  templateUrl: './registrar-lotes.component.html',
  styleUrls: ['./registrar-lotes.component.css']
})
export class RegistrarLotesComponent implements OnInit, OnDestroy {
  existenceSelect: Existence = new Existence();
  sectionSelect: Section = new Section();
  inputQuantity: number = 0;
  inputDate!: Date;
  inputShelf: number = 0;

  actualDate:Date = new Date();

  batch:Batch = new Batch();
  batches: Batch[] = [];
  sections: Section[]= [];
  existences: Existence[]= [];

  private subscriptions = new Subscription();

  constructor(private existenceService: ExistenceService, private sectionService: SectionService, private batchService: BatchService, private toastService: AppToastService) {
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.batchService.getAll().subscribe({
          next: (response: Batch[]) => {
            this.batches = response;
          },
          error: (err) => {
            console.log(err);
          }
        }
      )
    );
    this.subscriptions.add(
      this.existenceService.getAll().subscribe({
          next: (response: Existence[]) => {
            this.existences = response;
          },
          error: (err) => {
            console.log(err);
          }
        }
      )
    );
    this.subscriptions.add(
      this.sectionService.getAll().subscribe(
        {
          next: (response: Section[]) =>{
            this.sections = response;
          },
          error: (err) => {
            console.log(err);
          }
        }
      )
    );
  }

  create(){
    this.batch.dueDate = this.inputDate;
    this.batch.existenceCode = this.existenceSelect.code;
    this.batch.sectionId = this.sectionSelect.id;
    this.batch.quantity = this.inputQuantity;
    this.batch.shelf = this.inputShelf;

    if(this.batches.some(batch => batch.sectionId == this.batch.sectionId && batch.shelf == this.batch.shelf)){
      this.toastService.show("Error!", "Ya existe un lote en la misma seccion y estantería, no entra otro");
      return;
    }

      this.batchService.create(this.batch).subscribe(
        {
          next: (response: Batch) =>{
            this.toastService.show("Creado!", "Lote creado!");
            this.batches.push(response);
          },
          error: (err) => {
            console.log(err);
            this.toastService.show("Error!", "Hubo un error al intentar esta operación, no se pudo crear el lote");
          }
        }
      );

    this.inputDate = new Date();
    this.existenceSelect = new Existence();
    this.sectionSelect = new Section();
    this.inputQuantity = 0;
    this.inputShelf = 0;
  }

  chargeQuantity(event:any){ this.inputQuantity = event.target.value; }
  chargeDate(event:any){ this.inputDate = event.target.value; }
  chargeShelf(event:any){ this.inputShelf = event.target.value; }

  compareDates(){
    if (this.inputDate) {
      const inputDate = new Date(this.inputDate);

      if (inputDate > this.actualDate) return false
      else if (inputDate < this.actualDate) return true;
    }

    return true;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
