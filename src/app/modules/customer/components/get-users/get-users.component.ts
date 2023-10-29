import { RestService } from './../../services/rest.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';
import { PositionService } from '../../services/position.service';

@Component({
  selector: 'fn-get-users',
  templateUrl: './get-users.component.html',
  styleUrls: ['./get-users.component.css']
})
export class GetUsersComponent implements OnInit {
  listaCargos: any[] = [];
  lsitaFiltroCargos: any[] = [];

  getCargos(){
    this.restService.getCargos().subscribe((info: any) => {
      this.listaCargos = info;
      this.lsitaFiltroCargos = [...info];
    });
  }

  ngOnInit() {
    this.listaCargos = this.positionService.getCargo()

    this.positionService.cargos$.subscribe((cargos) =>{
      this.listaCargos = cargos;
      this.getCargos()
    })
  }

  cargoElegido: string = '';
  usuarioArray: any[] = [];
  listaFiltrada: boolean = false;

  constructor(
    private restService: RestService,
    private userService: UserService,
    private positionService: PositionService
  ) {}

  borrarFiltro() {
    this.cargoElegido = '';
    this.usuarioArray = [];
    this.listaFiltrada = false;
  }

  filtrarUsuarios() {
    if (this.cargoElegido !== '') {
      this.restService.getUsuariosPorCargo(this.cargoElegido).subscribe(
        (data) => {
          this.usuarioArray = data;
          this.listaFiltrada = true;

          console.log(data);
        },
        (error) => {
          console.error('Error al obtener usuarios por cargo', error);

          if (this.usuarioArray.length === 0) {
            Swal.fire({
              icon: 'warning',
              title: 'No se encontraron usuarios',
              text: `No se encontró ningún usuario con el cargo: ${this.cargoElegido}`,
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#808080',
            });
          }
        }
      );
    } else {
      this.listaFiltrada = false;
    }
  }
}