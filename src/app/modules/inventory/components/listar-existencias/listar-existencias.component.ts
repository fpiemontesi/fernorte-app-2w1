import { Component, OnInit } from '@angular/core';
import { Existencias } from '../../models/existencias';
import { ListarExistenciasService } from '../../services/listar-existencias.service';

@Component({
  selector: 'fn-listar-existencias',
  templateUrl: './listar-existencias.component.html',
  styleUrls: ['./listar-existencias.component.css']
})
export class ListarExistenciasComponent  implements OnInit{

  list: Existencias[]=[];

constructor(private listarExistenciasService:ListarExistenciasService){}

  ngOnInit(): void {
      this.LlenarList();
  }

  LlenarList(){
  this.listarExistenciasService.getExistencias().subscribe(list=>{
  this.list=list;
  console.log(this.list);

})
  }


  EliminarExistencia(id:number){

    const confirmed = confirm('Seguro desea eliminar un producto?')

    if(confirmed){
      this.listarExistenciasService.deleteExistencia(id).subscribe({
        next:() =>{
          alert('Producto eliminado correctamente!');
          this.LlenarList();
        },
        error:() =>{
          alert('Ocurrio un erroe al elimar el producto!');
        }
      })
    }
    }
    


}
