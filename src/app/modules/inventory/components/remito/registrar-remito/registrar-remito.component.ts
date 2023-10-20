import { Component } from '@angular/core';
import { Remito } from '../../../models/Remito';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'fn-registrar-remito',
  templateUrl: './registrar-remito.component.html',
  styleUrls: ['./registrar-remito.component.css']
})
export class RegistrarRemitoComponent {
  remitos: Remito[] = [];
  remito: Remito = new Remito();

  agregarRemito(form: NgForm) {
    if (form.valid) {
      this.remitos.push(this.remito);
      this.remito = new Remito(); 
    }else{
      alert('Datos ingresados son invalidos');
    }
  }

  eliminarRemito(index: number) {
    this.remitos.splice(index, 1);
  }
}
