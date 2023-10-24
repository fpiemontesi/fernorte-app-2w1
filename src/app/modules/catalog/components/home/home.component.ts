import { Component } from '@angular/core';

@Component({
  selector: 'fn-home-catalog',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  registrar = false;
  modificar = false;
  eliminar=false;


  mostrarRegistrar(){
    this.registrar=true;
    this.modificar=false;
    this.eliminar=false;
  }
  mostrarUpdate(){
    this.registrar=false;
    this.modificar=true;
    this.eliminar=false;
  }

  mostrarDelete(){
    this.registrar=false;
    this.modificar=false;
    this.eliminar=true;
  }
}
