import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Existence } from '../../../models/existence';
import { ExistenciasService } from '../../../services/existance.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastInfo } from '../../../models/notification';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modificar-existencia',
  templateUrl: './modificar-existencia.component.html',
  styleUrls: ['./modificar-existencia.component.css']
})
export class ModificarExistenciaComponent implements OnInit,OnDestroy {
  existenciaAModificar:Existence= {
    code:"1",
    minimunStock:5,
    name:"Tornillos"
  }
  toasts: ToastInfo[] = [];
  invalido=false

  suscripciones:Subscription=new Subscription();
  
  constructor(private existenciasService: ExistenciasService, private activatedRoute: ActivatedRoute, private router:Router){
  }

  ngOnInit(): void {
    this.suscripciones.add(
      this.activatedRoute.params.subscribe({
        next: (params: Params) => {


          this.suscripciones.add(
            this.existenciasService.getExistencia(params['id']).subscribe({
            next:(e)=>{
              this.existenciaAModificar = e
            }
          }))
        }
      }))
  }
  ngOnDestroy(): void {
    this.suscripciones.unsubscribe()
  }

  confirmar(form: NgForm) {
    if(form.valid){
      this.suscripciones.add(
        this.existenciasService.modificarExistencia(this.existenciaAModificar).subscribe({
          next:() =>{
            // this.notificar("Exito",'Producto modificado correctamente!');
            // alert('Producto modificado correctamente!');
            this.router.navigate(['/inventory/existencias/listar']);
          },
          error:() =>{
            this.notificar("Error",'Ocurrio un error al modificar el producto!');
            // alert('Ocurrio un error al elimar el producto!');
          }
        }))
    }else{
      this.notificar("Error",'Valores invalidos');
      this.invalido=true
    }
  }
  cancelar(){
    
    this.router.navigate(['/inventory/listar-existencias']);
  }

  notificar(header: string, body: string) {
    this.toasts.push({ header, body, delay:1000 });
  }
}