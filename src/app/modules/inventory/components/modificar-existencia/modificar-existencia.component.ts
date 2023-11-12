import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Existencia } from '../../models/existencia';
import { ExistenciasService } from '../../services/existance.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastInfo } from '../../models/notification';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modificar-existencia',
  templateUrl: './modificar-existencia.component.html',
  styleUrls: ['./modificar-existencia.component.css']
})
export class ModificarExistenciaComponent implements OnInit,OnDestroy {
  existenciaAModificar:Existencia= {
    id:1,
    stock_minimo:5,
    nombre:"Tornillos",
    id_catalogo:5
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
            this.router.navigate(['/inventory/listar-existencias']);
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