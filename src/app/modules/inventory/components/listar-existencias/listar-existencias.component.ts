import { Component, OnInit } from '@angular/core';
import { Existencia } from '../../models/existencia';
import { ListarExistenciasService } from '../../services/existance.service';
import { Router } from '@angular/router';
import { ToastInfo } from '../../models/notification';

@Component({
  selector: 'fn-listar-existencias',
  templateUrl: './listar-existencias.component.html',
  styleUrls: ['./listar-existencias.component.css'],
})
export class ListarExistenciasComponent implements OnInit {
  
  list: Existencia[] = [];
  toasts: ToastInfo[] = [];

  constructor(private listarExistenciasService: ListarExistenciasService, private router:Router) {}

  ngOnInit(): void {
    this.llenarList();
  }

  llenarList() {
    this.listarExistenciasService.getExistencias().subscribe((list) => {
      this.list = list;
      console.log(this.list);
    });
  }

  eliminarExistencia(id: number) {
    //Debe funcionar con Modal de angular: https://ng-bootstrap.github.io/#/components/modal/examples
    const confirmed = confirm('Seguro desea eliminar un producto?');

    if (confirmed) {
      this.listarExistenciasService.deleteExistencia(id).subscribe({
        next: () => {
          this.notificar('Exito','Producto eliminado correctamente!')
          this.llenarList();
        },
        error: () => {
          this.notificar('Exito','Ocurrio un erroe al elimar el producto!')
        },
      });
    }
  }

  modificarExistencia(id: number) {
    this.router.navigate(['/inventory/modificar-existencia/'+id]);
  }
  
  notificar(header: string, body: string) {
    this.toasts.push({ header, body, delay:1000 });
  }
}
