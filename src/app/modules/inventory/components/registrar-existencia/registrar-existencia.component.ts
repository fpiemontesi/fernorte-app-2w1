import { Component } from '@angular/core';
import { existencia } from '../../models/existencia';
import { Subscription } from 'rxjs';
import { ExistenciaService } from '../../services/existencia.service';
import { articulo } from '../../models/articulo';

@Component({
  selector: 'fn-registrar-existencia',
  templateUrl: './registrar-existencia.component.html',
  styleUrls: ['./registrar-existencia.component.css']
})
export class RegistrarExistenciaComponent {
  listaArticulos: articulo[] = [];
  articuloSeleccionado: articulo = {} as articulo; //inicializado "vacio"
  existenciaCreada: existencia = {} as existencia;
  paso1: boolean = true;
  paso2: boolean = false;
  botonHabil : boolean = false;
  private subscription = new Subscription();

  constructor(private existenciaService: ExistenciaService) { }

  ngOnInit(): void {
    this.cargarArticulos();
  }

  onSeleccionar(articulo : articulo){
    this.articuloSeleccionado = articulo;
    this.botonHabil = true;
  }

  onFinalizar(){
    if(this.existenciaCreada.stock_minimo == null){
      alert("Error, cargar stock minimo antes de finalizar")
    } else {
      this.existenciaCreada.id = this.articuloSeleccionado.id;
      this.existenciaCreada.nombre = this.articuloSeleccionado.nombre;
      this.agregarExistencia();
    }
  }

  onPaso1(){
    this.paso1 = true;
    this.paso2 = false;
  }

  onPaso2(){
    this.paso1 = false;
    this.paso2 = true;
  }

  private cargarArticulos() {
    this.subscription.add(
      this.existenciaService.get().subscribe({
        next: (articulos: articulo[]) => {
          this.listaArticulos = articulos;
        },
        error: () => {
          alert("Error en la API");
        }
      })
    )
  }

  private agregarExistencia(){
    this.existenciaService.create(this.existenciaCreada).subscribe({
      next: (existencia : existencia) => {
        alert("Existencia creada exitosamente");
        this.existenciaCreada = {} as existencia; //lo reseteo
      },
      error:() => {
        alert("Error en la API");
      }
    })
  }
}
