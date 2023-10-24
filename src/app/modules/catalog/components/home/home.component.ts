import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fn-home-catalog',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

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
}
