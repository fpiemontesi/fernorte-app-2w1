import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Existencia } from '../../models/existencia';
import { ListarExistenciasService } from '../../services/existance.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-modificar-existencia',
  templateUrl: './modificar-existencia.component.html',
  styleUrls: ['./modificar-existencia.component.css']
})
export class ModificarExistenciaComponent implements OnInit {
  existenciaAModificar:Existencia= {
    id:1,
    stock_minimo:5,
    nombre:"Tornillos",
    id_catalogo:5
  }
  toasts: object[] = [];
  invalido=false
  
  constructor(private service: ListarExistenciasService, private activatedRoute: ActivatedRoute, private router:Router){
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (params: Params) => {
        this.service.getExistencia(params['id']).subscribe({
          next:(e)=>{
            this.existenciaAModificar = e
          }
        })
      }
    })
  }

  logearse(form: NgForm) {
    if(form.valid){
      alert("Exito")
      this.service.modificarExistencia(this.existenciaAModificar).subscribe({
        next:() =>{
          // this.notificar('Producto modificado correctamente!',"");
          alert('Producto modificado correctamente!');
          this.router.navigate(['/inventory/listar-existencias']);
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

  notificar(header: string, body: string) {
    this.toasts.push({ header, body });
  }
}