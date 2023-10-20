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

  mostrarmodificar() {
    this.list = false
    this.form = false
    this.modificar = true
  }
  showlist() {
    this.list = true
    this.form = false
    this.modificar = false
  }
  showform() {
    this.list = false
    this.form = true
    this.modificar = false
  }
}
