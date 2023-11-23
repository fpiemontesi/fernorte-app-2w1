import { Component, OnDestroy, OnInit } from '@angular/core';
import { Existencia } from '../../../models/existencia';
import { ExistenciasService } from '../../../services/existance.service';
import { Router } from '@angular/router';
import { ToastInfo } from '../../../models/notification';
import { Subscription, of } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'fn-listar-existencias',
  templateUrl: './listar-existencias.component.html',
  styleUrls: ['./listar-existencias.component.css'],
})
export class ListarExistenciasComponent implements OnInit, OnDestroy {
  list: Existencia[] = [];
  toasts: ToastInfo[] = [];
  suscripciones: Subscription = new Subscription();

  constructor(
    private existenciaService: ExistenciasService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.llenarList();
  }
  ngOnDestroy(): void {
    this.suscripciones.unsubscribe();
  }

  llenarList() {
    this.suscripciones.add(
      this.existenciaService.getExistencias().subscribe((list) => {
        this.list = list;
      })
    );
  }

  eliminarExistencia(id: number) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.description = 'Seguro desea eliminar un producto?';
    modalRef.result.then(
      () => {
        this.suscripciones.add(
          this.existenciaService.deleteExistencia(id).subscribe({
            next: () => {
              this.notificar('Exito', 'Producto eliminado correctamente!');
              this.llenarList();
            },
            error: () => {
              this.notificar(
                'Error',
                'Ocurrio un error al eliminar el producto!'
              );
            },
          })
        );
      },
      () => {
      }
    );
  }

  modificarExistencia(id: number) {
    this.router.navigate(['/inventory/modificar-existencia/' + id]);
  }

  notificar(header: string, body: string) {
    this.toasts.push({ header, body, delay: 1000 });
  }
}
