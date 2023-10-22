import {Component, OnDestroy, OnInit} from '@angular/core';
import {StorageZoneService} from "../../../services/storage-zone.service";
import {StorageZone} from "../../../models/storage-zone";
import {Subscription} from "rxjs";
import {Section} from "../../../models/section";
import {SectionService} from "../../../services/section.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'fn-create-section',
  templateUrl: './create-section.component.html',
  styleUrls: ['./create-section.component.css']
})
export class CreateSectionComponent implements OnInit, OnDestroy {
  storageZones: StorageZone[] = [];
  sections: Section[] = [];
  newSection: Section = new Section();

  sectionsFiltered: Section[] = [];
  sectionParam: Section = new Section();
  filtrando:boolean = false;
  zoneFiltered: StorageZone = new StorageZone();

  private subscriptions = new Subscription();

  constructor(private storageService: StorageZoneService, private sectionService: SectionService) {
  }


  ngOnInit(): void {
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

  createSection(form: NgForm){
    if(form.invalid){
      alert('Formulario invalido');
      return;
    }

    if(this.sections.some(section => section.id == this.newSection.id && section.id_zona ==
      this.newSection.id_zona)){
      alert("Ya existe una seccion con ese ID");
      return;
    }

    this.sectionService.create(this.newSection).subscribe(
      {
        next: (response: Section) =>{
          alert("Sección creada!");
          this.sections.push(response);
        },
        error: (err) => {
          console.log(err);
          alert("Hubo un error al intentar esta operación, no se pudo crear la sección")
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
}
