import { Component, OnInit } from '@angular/core';
import { Existencia } from '../../models/existencia';
import { ListarExistenciasService } from '../../services/existance.service';
import { Router } from '@angular/router';

@Component({
  selector: 'fn-listar-existencias',
  templateUrl: './listar-existencias.component.html',
  styleUrls: ['./listar-existencias.component.css'],
})
export class ListarExistenciasComponent implements OnInit {
  list: Existencia[] = [];

  constructor(private listarExistenciasService: ListarExistenciasService, private router:Router) {}

  ngOnInit(): void {
    this.LlenarList();
  }

  LlenarList() {
    this.listarExistenciasService.getExistencias().subscribe((list) => {
      this.list = list;
      console.log(this.list);
    });
  }

  EliminarExistencia(id: number) {
    const confirmed = confirm('Seguro desea eliminar un producto?');

    if (confirmed) {
      this.listarExistenciasService.deleteExistencia(id).subscribe({
        next: () => {
          alert('Producto eliminado correctamente!');
          this.LlenarList();
        },
        error: () => {
          alert('Ocurrio un erroe al elimar el producto!');
        },
      });
    }
  }

  ModificarExistencia(id: number) {
    this.router.navigate(['/inventory/modificar-existencia/'+id]);
  }
}
