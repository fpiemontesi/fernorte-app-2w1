import { Component } from '@angular/core';

@Component({
  selector: 'fn-registrar-lotes',
  templateUrl: './registrar-lotes.component.html',
  styleUrls: ['./registrar-lotes.component.css']
})
export class RegistrarLotesComponent {
  existenciaSelect: number | undefined;
  seccionSelect: number | undefined;
  inputCantidad: number = 0;
  inputFecha!: Date;
  inputEstante: number = 0;

  fechaActual:Date = new Date();

  lote:Object = {};

  crear(){
    this.lote = {
      existenciaId: this.existenciaSelect,
      seccionId: this.seccionSelect,
      cantidad: this.inputCantidad,
      fechaVencimiento: this.inputFecha,
      estante: this.inputEstante,
    }
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
}
