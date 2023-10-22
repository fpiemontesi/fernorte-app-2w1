import { Component } from '@angular/core';
import { Lote } from '../../models/lote';
import { Existence } from '../../models/existence';
import { Section } from '../../models/section';
import { Subscription } from 'rxjs';
import { SectionService } from '../../services/section.service';
import { ExistenceService } from '../../services/existence.service';
import { LoteService } from '../../services/lote.service';

@Component({
  selector: 'fn-registrar-lotes',
  templateUrl: './registrar-lotes.component.html',
  styleUrls: ['./registrar-lotes.component.css']
})
export class RegistrarLotesComponent {
  existenciaSelect: Existence = new Existence();
  seccionSelect: Section = new Section();
  inputCantidad: number = 0;
  inputFecha!: Date;
  inputEstante: number = 0;

  fechaActual:Date = new Date();

  lote:Lote = new Lote();
  lotes: Lote[] = [];
  sections: Section[]= [];
  existences: Existence[]= [];

  private subscriptions = new Subscription();

  constructor(private existenceService: ExistenceService, private sectionService: SectionService, private loteService: LoteService) {
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.loteService.getAll().subscribe({
          next: (response: Lote[]) => {
              return this.lotes = response;
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
              return this.existences = response;
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

  crear(){
    this.lote.due_date = this.inputFecha;
    this.lote.id_existence = this.existenciaSelect.id;
    this.lote.id_section = this.seccionSelect.id;
    this.lote.quantity = this.inputCantidad;
    this.lote.shelf = this.inputEstante;

    if(this.lotes.some(lote => lote.id_section == this.lote.id_section && lote.shelf == this.lote.shelf)){
      alert("Ya existe un lote en la misma seccion y estantería, no entra otro");
      return;
    }

      this.loteService.create(this.lote).subscribe(
        {
          next: (response: Lote) =>{
            alert("Lote creado!");
            this.lotes.push(response);
          },
          error: (err) => {
            console.log(err);
            alert("Hubo un error al intentar esta operación, no se pudo crear el lote")
          }
        }
      );

    this.inputFecha = new Date();
    this.existenciaSelect = new Existence();
    this.seccionSelect = new Section();
    this.inputCantidad = 0;
    this.inputEstante = 0;
  }

  cargarCantidad(event:any){ this.inputCantidad = event.target.value; }
  cargarFecha(event:any){ this.inputFecha = event.target.value; }
  cargarEstante(event:any){ this.inputEstante = event.target.value; }

  compararFechas(){
    if (this.inputFecha) {
      const fechaInput = new Date(this.inputFecha);

      if (fechaInput > this.fechaActual) return false
      else if (fechaInput < this.fechaActual) return true;
    }

    return true;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
