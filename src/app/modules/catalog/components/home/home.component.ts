import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fn-home-catalog',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  registrar = false;
  modificar = false;
  eliminar=false;

  list = true
  form = false
  modificar = false
  ngOnInit(): void {
  }

  constructor() { }

  mostrarModificar() {
    this.list = false
    this.form = false
    this.modificar = true
  }
  showList() {
    this.list = true
    this.form = false
    this.modificar = false
  }
  showForm() {
    this.list = false
    this.form = true
    this.modificar = false
  }

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
