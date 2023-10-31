import {Component, OnDestroy, OnInit, Type} from '@angular/core';
import {StorageZoneService} from "../../../services/storage-zone.service";
import {StorageZone} from "../../../models/storage-zone";
import {Subscription} from "rxjs";
import {Section} from "../../../models/section";
import {SectionService} from "../../../services/section.service";
import {NgForm} from "@angular/forms";
import { BatchService } from '../../../services/batch.service';
import { Batch } from '../../../models/batch';
import { AppToastService } from '../../../services/app-toast.service';

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'ngbd-modal-confirm',
	standalone: true,
	template: `
		<div class="modal-header">
			<h4 class="modal-title" id="modal-title">Eliminar sección</h4>
			<button
				type="button"
				class="btn-close"
				aria-describedby="modal-title"
				(click)="modal.dismiss('Cross click')"
			></button>
		</div>
		<div class="modal-body">
			<p>
				<strong>¿Seguro de que quieres eliminarla?</strong>
			</p>
			<p>
				Toda la información asociada a esta sección va a se eliminada.
				<span class="text-danger">Esta operación no puede ser desecha.</span>
			</p>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancelar</button>
			<button type="button" class="btn btn-danger" (click)="modal.close('Ok click')">Ok</button>
		</div>
	`,
})
export class NgbdModalConfirm {
	constructor(public modal: NgbActiveModal) {}
}

const MODALS: { [name: string]: Type<any> } = {
	focusFirst: NgbdModalConfirm,
};

@Component({
  selector: 'fn-create-section',
  templateUrl: './create-section.component.html',
  styleUrls: ['./create-section.component.css']
})
export class CreateSectionComponent implements OnInit, OnDestroy {
  storageZones: StorageZone[] = [];
  sections: Section[] = [];
  newSection: Section = new Section();
  batchs: Batch[] = [];

  sectionsFiltered: Section[] = [];
  sectionParam: Section = new Section();
  filtering:boolean = false;
  zoneFiltered: StorageZone = new StorageZone();

  editing:Boolean = false;
  editingId: number = 0 ;

  private subscriptions = new Subscription();

  constructor(private batchService: BatchService, private storageService: StorageZoneService, private sectionService: SectionService, private toastService: AppToastService, private _modalService: NgbModal) {
  }


  ngOnInit(): void {
    this.subscriptions.add(
      this.batchService.getAll().subscribe(
        {
          next: (response: Batch[]) =>{
            this.batchs = response;
          },
          error: (err) => {
            console.log(err);
          }
        }
      )
    )
    this.subscriptions.add(
      this.storageService.getAll().subscribe({
          next: (response: StorageZone[]) => {
              this.storageZones = response;
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

  saveSection(form: NgForm){
    if(this.editing) this.editSection(form)
    else this.createSection(form);
  }

  createSection(form: NgForm){
    if(form.invalid){
      this.toastService.show("Error!","Formulario invalido");
      return;
    }

    if(this.sections.some(section => section.name == this.newSection.name && section.zoneId ==
      this.newSection.zoneId)){
      this.toastService.show("Error!","Ya existe una seccion con ese nombre y zona");
      return;
    }

    this.sectionService.create(this.newSection).subscribe(
      {
        next: (response: Section) =>{
          this.toastService.show("Creada","Sección creada!");
          this.sections.push(response);
          this.newSection.name = "";
          this.newSection.zoneId = 0;
          this.filter();
        },
        error: (err) => {
          this.toastService.show("Error!","Hubo un error al intentar esta operación, no se pudo crear la sección");
        }
      }
    );
  }

  editSection(form: NgForm){
    if(form.invalid){
      this.toastService.show("Error!","Formulario invalido");
      return;
    }

    if(this.sections.some(section => section.name == this.newSection.name && section.zoneId ==
      this.newSection.zoneId)){
      this.toastService.show("Error!","Ya existe una seccion con ese nombre y zona");
      return;
    }

    this.sectionService.edit(this.newSection).subscribe(
      {
        next: (response: Section) =>{
          this.toastService.show("Editada","Sección editada!");
          this.sections = this.sections.filter(section => { section.id != this.newSection.id })
          this.newSection.name = "";
          this.newSection.zoneId = 0;
          this.filter();
          this.editing = false;
        },
        error: (err) => {
          this.toastService.show("Error!","Hubo un error al intentar esta operación, no se pudo editar la sección");
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  filter(){
    this.filtering = true;
    this.subscriptions.add(
      this.sectionService.getByZone(this.sectionParam.zoneId).subscribe(
        {
          next: (response: Section[]) =>{
            this.sectionsFiltered = response;
          },
          error: (err) => {
            console.log(err);
          }
        }
      )
    )
    this.storageZones.forEach(zone => {
      if(zone.id == this.sectionParam.zoneId){
        this.zoneFiltered.name = zone.name;
      }
    });
  }

  deleteSection(id: number){
    let flag:Boolean = false;
    try{
      this.batchs.forEach(lote => {
        if(lote.sectionId == id){
          flag = true;
          this.toastService.show("Error!","No se puede eliminar esta sección porque hay un lote que depende de ella");
          throw "Existe un lote que depende de esta sección";
        }
      })
    }catch(e){}

    if(flag) return;

    this.subscriptions.add(
      this.sectionService.delete(id).subscribe(
        {
          next: (response: void) =>{
            this.filter();
          },
          error: (err) => {
            console.log(err);
          }
        }
      )
    )
  }

  edit(id: number){
    this.subscriptions.add(
      this.sectionService.getById(id).subscribe(
        {
          next: (response: Section) =>{
            this.newSection = response;
            this.editingId = id;
            this.editing = true;
          },
          error: (err) => {
            console.log(err);
          }
        }
      )
    )
  }

  open(name: string) {
		this._modalService.open(MODALS[name]);
	}
}
