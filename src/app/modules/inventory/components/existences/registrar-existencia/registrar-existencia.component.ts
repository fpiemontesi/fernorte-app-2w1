import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Article } from '../../../models/article';
import { Existence } from '../../../models/existence';
import { ExistenciaService } from '../../../services/existencia.service';
import { AppToastService } from '../../../services/app-toast.service';

@Component({
  selector: 'fn-registrar-existencia',
  templateUrl: './registrar-existencia.component.html',
  styleUrls: ['./registrar-existencia.component.css']
})
export class RegistrarExistenciaComponent {
  listaArticulos: Article[] = [];
  articuloSeleccionado: Article = {} as Article; //inicializado "vacio"
  existenciaCreada: Existence = {} as Existence;
  paso1: boolean = true;
  paso2: boolean = false;
  botonHabil : boolean = false;
  private subscription = new Subscription();

  constructor(private existenciaService: ExistenciaService, private toastService: AppToastService) { }

  ngOnInit(): void {
    this.cargarArticulos();
  }

  onSeleccionar(articulo : Article){
    this.articuloSeleccionado = articulo;
    this.botonHabil = true;
  }

  onFinalizar(){
    if(this.existenciaCreada.minimunStock == null){
      this.toastService.show("Error","Cargar stock minimo antes de finalizar")
    } else {
      this.existenciaCreada.code = this.articuloSeleccionado.id;
      this.existenciaCreada.name = this.articuloSeleccionado.name;
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
        next: (articles: Article[]) => {
          this.listaArticulos = articles;
        },
        error: () => {
          this.toastService.show("Error","Error en la API")
        }
      })
    )
  }

  private agregarExistencia(){
    this.existenciaService.create(this.existenciaCreada).subscribe({
      next: (existencia : Existence) => {
        this.toastService.show("Exito","Existencia creada exitosamente")
        this.existenciaCreada = {} as Existence; //lo reseteo
        this.onPaso1();
      },
      error:() => {
        this.toastService.show("Error","Error en la API")
      }
    })
  }
}
