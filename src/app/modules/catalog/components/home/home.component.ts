import { Component } from '@angular/core';

@Component({
  selector: 'fn-home-catalog',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  registrar = false;
  modificar = false;


  mostrarRegistrar(){
    this.registrar=true;
    this.modificar=false;
  }
  mostrarUpdate(){
    this.registrar=false;
    this.modificar=true;
  }
}
