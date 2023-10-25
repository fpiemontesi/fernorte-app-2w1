import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fn-home-catalog',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  registerProduct = false;
  updateProduct = false;
  deleteProduct = false;

  list = true;
  form = false;
  modificar = false;

  ngOnInit(): void {
  }

  constructor() {
  }

  mostrarModificar() {
    this.list = false;
    this.form = false;
    this.modificar = true;
  }

  showList() {
    this.list = true;
    this.form = false;
    this.modificar = false;
  }

  mostrarRegisterProduct() {
    this.registerProduct = true;
    this.updateProduct = false;
    this.deleteProduct = false;
  }

  mostrarUpdateProduct() {
    this.registerProduct = false;
    this.updateProduct = true;
    this.deleteProduct = false;
  }

  mostrarDeleteProduct() {
    this.registerProduct = false;
    this.updateProduct = false;
    this.deleteProduct = true;
  }

  showForm() {
    this.list = false;
    this.form = true;
    this.modificar = false;
  }
}
