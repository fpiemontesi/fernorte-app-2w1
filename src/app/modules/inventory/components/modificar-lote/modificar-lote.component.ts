import { Component, OnDestroy, OnInit } from '@angular/core';
import { Batch } from '../../models/batch';
import { Existence } from '../../models/existence';
import { Section } from '../../models/section';
import { Observable, Subscription } from 'rxjs';
import { SectionService } from '../../services/section.service';
import { ExistenceService } from '../../services/existence.service';
import { BatchService } from '../../services/batch.service';
import { AppToastService } from '../../services/app-toast.service';


@Component({
  selector: 'fn-modificar-lote',
  templateUrl: './modificar-lote.component.html',
  styleUrls: ['./modificar-lote.component.css']
})
export class ModificarLoteComponent {

  sectionSelect: Section = new Section();
  inputQuantity: number = 0;
  inputDate!: Date;
  inputShelf: number = 0;

  actualDate:Date = new Date();

  batch:Batch = new Batch();
  batches: Batch[] = [];
  sections: Section[]= [];
  //existence$: Observable<Existence> = new Observable();
  existence: Existence = new Existence();

  private subscriptions = new Subscription();

  //ejemplo de una id lote que viene por root
  idBatch : number= 1;

  constructor(private existenceService: ExistenceService, private sectionService: SectionService, private batchService: BatchService, private toastService: AppToastService) {
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.batchService.getAll().subscribe({
          next: (response: Batch[]) => {
            this.batches = response;
          },
          error: (err) => {
            console.log("lista batch no se cargo "+err);
          }
        }
      )
    );

    this.subscriptions.add(
      this.batchService.getById(this.idBatch).subscribe({
          next: (response: Batch) => {
            //cargo el batch a modificar y sus valores.
            this.batch = response;
            this.sectionSelect.id = this.batch.sectionId;
            this.inputShelf = this.batch.shelf;
            this.inputDate = this.batch.dueDate;
            this.inputQuantity = this.batch.quantity;
            //cargo el nombre de la exitencia
            this.subscriptions.add(
              this.existenceService.getById(this.batch.existenceCode).subscribe({
                //code al ser string la respuesta te la devuelve dentro de un array
                  next: (exitResponse: Existence[]) => {
                    this.existence = exitResponse[0];
                  },
                  error: (err) => {
                    console.log("exitence por id no se cargo "+err);
                  }
                }
              )
           );
          },
          error: (err) => {
            console.log("batch por id no se cargo "+err);
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

  modificate(){

    if(this.batch.sectionId==this.sectionSelect.id && this.batch.shelf==this.inputShelf){
      this.batch.dueDate = this.inputDate;
      this.batch.quantity = this.inputQuantity;
    }

    else{
      this.batch.dueDate = this.inputDate;
      this.batch.sectionId = this.sectionSelect.id;
      this.batch.quantity = this.inputQuantity;
      this.batch.shelf = this.inputShelf;
      if(this.batches.some(batch => batch.sectionId == this.batch.sectionId && batch.shelf == this.batch.shelf)){
        this.toastService.show("Error!", "Ya existe un lote en la misma seccion y estantería, no entra otro");
        return;
      }
    }

      this.batchService.modificate(this.batch, this.idBatch).subscribe(
        {
          next: (response: Batch) =>{
            this.toastService.show("Modificado!", "Lote Modificado!");
            this.batches.push(response);
            
          },
          error: (err) => {
            console.log(err);
            this.toastService.show("Error!", "Hubo un error al intentar esta operación, no se pudo modificar el lote");
          }
        }
      );

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
