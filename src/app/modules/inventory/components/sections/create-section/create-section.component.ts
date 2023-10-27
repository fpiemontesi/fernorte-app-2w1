import {Component, ElementRef, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {StorageZoneService} from "../../../services/storage-zone.service";
import {StorageZone} from "../../../models/storage-zone";
import {Subscription} from "rxjs";
import {Section} from "../../../models/section";
import {SectionService} from "../../../services/section.service";
import {NgForm} from "@angular/forms";
import { LoteService } from '../../../services/lote.service';
import { Lote } from '../../../models/lote';

@Component({
  selector: 'fn-create-section',
  templateUrl: './create-section.component.html',
  styleUrls: ['./create-section.component.css']
})
export class CreateSectionComponent implements OnInit, OnDestroy {
  storageZones: StorageZone[] = [];
  sections: Section[] = [];
  newSection: Section = new Section();
  batchs: Lote[] = [];

  sectionsFiltered: Section[] = [];
  sectionParam: Section = new Section();
  filtrando:boolean = false;
  zoneFiltered: StorageZone = new StorageZone();

  editing:Boolean = false;
  editingId: number = 0 ;

  private subscriptions = new Subscription();

  constructor(private loteService: LoteService, private storageService: StorageZoneService, private sectionService: SectionService) {
  }


  ngOnInit(): void {
    this.subscriptions.add(
      this.loteService.getAll().subscribe(
        {
          next: (response: Lote[]) =>{
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
              return this.storageZones = response;
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
      alert('Formulario invalido');
      return;
    }

    if(this.sections.some(section => section.name == this.newSection.name && section.id_zona ==
      this.newSection.id_zona)){
      alert("Ya existe una seccion con ese nombre y zona");
      return;
    }

    this.sectionService.create(this.newSection).subscribe(
      {
        next: (response: Section) =>{
          alert("Sección creada!");
          this.sections.push(response);
          this.newSection.name = "";
          this.newSection.id_zona = 0;
          this.filtrar();
        },
        error: (err) => {
          alert("Hubo un error al intentar esta operación, no se pudo crear la sección")
        }
      }
    );
  }

  editSection(form: NgForm){
    if(form.invalid){
      alert('Formulario invalido');
      return;
    }

    if(this.sections.some(section => section.name == this.newSection.name && section.id_zona ==
      this.newSection.id_zona)){
      alert("Ya existe una seccion con ese nombre y zona");
      return;
    }

    this.sectionService.edit(this.newSection).subscribe(
      {
        next: (response: Section) =>{
          alert("Sección editada!");
          this.sections = this.sections.filter(section => { section.id != this.newSection.id })
          this.newSection.name = "";
          this.newSection.id_zona = 0;
          this.filtrar();
          this.editing = false;
        },
        error: (err) => {
          alert("Hubo un error al intentar esta operación, no se pudo editar la sección")
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  filtrar(){
    this.filtrando = true;
    this.subscriptions.add(
      this.sectionService.getByZone(this.sectionParam.id_zona).subscribe(
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
      if(zone.id == this.sectionParam.id_zona){
        this.zoneFiltered.name = zone.name;
      }
    });
  }

  eliminar(id: number){
    let borrar = confirm("seguro que desea eliminar la sección?");
    if(!borrar) return;

    let flag:Boolean = false;
    try{
      this.batchs.forEach(lote => {
        if(lote.id_section == id){
          flag = true;
          alert("No se puede eliminar esta sección porque hay un lote que depende de ella")
          throw "Existe un lote que depende de esta sección";
        }
      })
    }catch(e){}

    if(flag) return;

    this.subscriptions.add(
      this.sectionService.delete(id).subscribe(
        {
          next: (response: void) =>{
            this.filtrar();
          },
          error: (err) => {
            console.log(err);
          }
        }
      )
    )
  }

  editar(id: number){
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
}
