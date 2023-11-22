import { RestService } from './../../services/rest.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'fn-get-benefits',
  templateUrl: './get-benefits.component.html',
  styleUrls: ['./get-benefits.component.css']
})
export class GetBenefitsComponent implements OnInit{
  beneficioArray: any[] = [];
  constructor(private restService: RestService) {}
  ngOnInit(): void {
    this.getListPromotions();
  }
  getListPromotions() {
    this.restService.getPromociones().subscribe(
      (info: any) => {
        this.beneficioArray = info;
        if (this.beneficioArray.length === 0) {
          Swal.fire({
            icon: 'info',
            title: 'No hay beneficios disponibles',
            text: 'Por el momento no hay beneficios disponibles. Por favor, inténtelo nuevamente más tarde.',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#808080',
          });
        }
      },
      (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al obtener beneficios',
          text: 'Ocurrió un error al obtener los beneficios. Por favor, inténtelo nuevamente más tarde.',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#808080',
        });
      }
    );
  }
  enviarBeneficios() {
    Swal.fire({
      icon: 'warning',
      title: '¿Estás seguro de enviar beneficios a todos los clientes?',
      showCancelButton: true,
      confirmButtonText: 'Sí, enviar',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#808080',
      confirmButtonColor: '#308B45',
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          icon: "info",
          title: 'Enviando beneficios',
          text: 'Esta acción puede demorar un tiempo...',
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
          showConfirmButton: false,
          timer: 13000,
          timerProgressBar: true,
        });
        this.restService.postBenefits().subscribe((info: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Beneficios enviados con éxito',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#808080',
          });
        });
      }
    });
  }
}
