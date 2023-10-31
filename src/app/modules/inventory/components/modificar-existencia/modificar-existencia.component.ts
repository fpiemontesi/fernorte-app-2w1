import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Existencia } from '../../models/existencia';
import { ListarExistenciasService } from '../../services/existance.service';

@Component({
  selector: 'app-modificar-existencia',
  templateUrl: './modificar-existencia.component.html',
  styleUrls: ['./modificar-existencia.component.css']
})
export class ModificarExistenciaComponent  {
  existenciaAModificar:Existencia= {
    id:1,
    id_catalogo:1,
    nombre:"Tornillos",
    stock_minimo:5}
  invalido=false
  constructor(private service: ListarExistenciasService){
  }

  cargarExistencia(e:Existencia){
    this.existenciaAModificar=e
  }
  logearse(form: NgForm) {
    if(form.valid){
      alert("Exito")
      this.service.modificarExistencia(this.existenciaAModificar).subscribe({
        next:() =>{
          alert('Producto modificado correctamente!');
        },
        error:() =>{
          alert('Ocurrio un error al elimar el producto!');
        }
      })
    }else{
      console.log("invalido")
      this.invalido=true
    }
  }
}