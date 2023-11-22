import { Component } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { UserService } from '../../services/user.service';
import { CargoService } from '../../services/cargo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'fn-get-user',
  templateUrl: './get-user.component.html',
  styleUrls: ['./get-user.component.css'],
})
export class GetUserComponent {
  listaCargos: any[] = [];
  lsitaFiltroCargos: any[] = [];

  getCargos() {
    this.restService.getCargos().subscribe((info: any) => {
      this.listaCargos = info;
      this.lsitaFiltroCargos = [...info];
    });
  }

  ngOnInit() {
    this.listaCargos = this.cargoService.getCargo();

    this.cargoService.cargos$.subscribe((cargos) => {
      this.listaCargos = cargos;
      this.getCargos();
    });
  }

  cargoElegido: string = '';
  usuarioArray: any[] = [];
  listaFiltrada: boolean = false;

  constructor(
    private restService: RestService,
    private userService: UserService,
    private cargoService: CargoService
  ) {}

  borrarFiltro() {
    this.cargoElegido = '';
    this.usuarioArray = [];
    this.listaFiltrada = false;
  }

  filtrarUsuarios() {
    if (this.cargoElegido == '') {
      Swal.fire({
        icon: 'warning',
        title: 'Debe seleccionar un cargo',
        text: 'Seleccione un cargo de la lista desplegable',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#808080',
      });
      return;
    }

    // Reiniciar el array antes de realizar la búsqueda
    this.usuarioArray = [];

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

          this.usuarioArray = [];
          this.listaFiltrada = false;
          this.cargoElegido = '';
        }
      }
    );
  }
}
