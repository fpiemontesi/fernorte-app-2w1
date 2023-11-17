import { Component } from '@angular/core';

@Component({
  selector: 'fn-home-purchase',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  mostrarComponente: boolean = false;
  mostrarCrearPC() {
    this.mostrarComponente = true;
    this.mostrarOCs1 = false;
    this.mostrarOC1 = false;
    this.mostrarPCs1 = false;
    this.mostrarPC1 = false;
    this.mostrarPs1= false;
    this.crearP1= false;
    this.crearOC1 = false;
  }
  
  mostrarOCs1: boolean = false;
  mostrarOCs() {
    this.mostrarOCs1 = true;
    this.mostrarComponente = false;
    this.mostrarOC1 = false;
    this.mostrarPCs1 = false;
    this.mostrarPC1 = false;
    this.mostrarPs1= false;
    this.crearP1= false;
    this.crearOC1 = false;
  }

  mostrarOC1: boolean = false;
  mostrarOC() {
    this.mostrarOC1 = true;
    this.mostrarOCs1 = false;
    this.mostrarComponente = false;
    this.mostrarPCs1 = false;
    this.mostrarPC1 = false;
    this.mostrarPs1= false;
    this.crearP1= false;
    this.crearOC1 = false;
  }
  mostrarPCs1: boolean = false;
  mostrarPCs() {
    this.mostrarPCs1 = true;
    this.mostrarOC1 = false;
    this.mostrarOCs1 = false;
    this.mostrarComponente = false;
    this.mostrarPC1 = false;
    this.mostrarPs1= false;
    this.crearP1= false;
    this.crearOC1 = false;
  }
  mostrarPC1: boolean = false;
  mostrarPC() {
    this.mostrarPC1 = true;
    this.mostrarPCs1 = false;
    this.mostrarOC1 = false;
    this.mostrarOCs1 = false;
    this.mostrarComponente = false;
    this.mostrarPs1= false;
    this.crearP1= false;
    this.crearOC1 = false;
    
  }
  mostrarPs1: boolean = false;
  mostrarPs(){
    this.mostrarPs1= true;
    this.mostrarPC1 = false;
    this.mostrarPCs1 = false;
    this.mostrarOC1 = false;
    this.mostrarOCs1 = false;
    this.mostrarComponente = false;
    this.crearP1= false;
        this.crearOC1 = false;
  }
  crearP1: boolean = false;
  crearP(){
    this.crearP1= true;
    this.mostrarPs1= false;
    this.mostrarPC1 = false;
    this.mostrarPCs1 = false;
    this.mostrarOC1 = false;
    this.mostrarOCs1 = false;
    this.mostrarComponente = false;
    this.crearOC1 = false;
  }
  crearOC1: boolean = false;
  crearOC(){
    this.crearOC1 = true;
    this.crearP1= false;
    this.mostrarPs1= false;
    this.mostrarPC1 = false;
    this.mostrarPCs1 = false;
    this.mostrarOC1 = false;
    this.mostrarOCs1 = false;
    this.mostrarComponente = false;
  }
}
