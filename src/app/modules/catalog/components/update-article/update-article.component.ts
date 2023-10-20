import { Component } from '@angular/core';
import {Articulo} from "../../models/articulo";
import {Categoria} from "../../models/categoria";
import {Marca} from "../../models/marca";

@Component({
  selector: 'fn-update-article',
  templateUrl: './update-article.component.html',
  styleUrls: ['./update-article.component.css']
})
export class UpdateArticleComponent {
  articulos: Articulo[] = [
    {
      id: "1",
      modelo: "iPhone 14",
      nombre: "Apple iPhone 14",
      precioMinorista: 1000,
      precioMayorista: 900,
      marca: "",
      categorias:[],
      descripcion: "El nuevo iPhone 14 de Apple es el teléfono más avanzado del mercado. Cuenta con un chip A16 Bionic ultrarrápido, una cámara trasera de 48MP y una batería de larga duración. El iPhone 14 también tiene un nuevo diseño con una pantalla más grande y bordes más delgados.",
      dimensiones:"asd",
      peso:"asd",
      color:"asd",
      material:"asd",
      paisOrigen:"asd"
    },
    {
      id: "2",
      modelo: "Galaxy S23",
      nombre: "Samsung Galaxy S23",
      precioMinorista: 900,
      precioMayorista: 800,
      marca: "",
      categorias:[],
      descripcion: "El nuevo Samsung Galaxy S23 es uno de los teléfonos más esperados del año. Cuenta con un chip Snapdragon 8 Gen 2 ultrarrápido, una cámara trasera de 108MP y una batería de larga duración. El Galaxy S23 también tiene un nuevo diseño con una pantalla más grande y bordes más delgados.",
      dimensiones:"asd",
      peso:"asd",
      color:"asd",
      material:"asd",
      paisOrigen:"asd"
    },
    {
      id: "3",
      modelo: "MacBook Air M2",
      nombre: "Apple MacBook Air M2",
      precioMinorista: 1200,
      precioMayorista: 1100,
      marca: "",
      categorias:[],
      descripcion: "La nueva MacBook Air M2 de Apple es la computadora portátil más delgada y ligera del mercado. Cuenta con un chip M2 ultrarrápido, una pantalla Liquid Retina de 13.3 pulgadas y una batería de larga duración. La MacBook Air M2 también tiene un nuevo diseño con un teclado retroiluminado y un trackpad Force Touch.",
      dimensiones:"asd",
      peso:"asd",
      color:"asd",
      material:"asd",
      paisOrigen:"asd"
    },
    {
      id: "4",
      modelo: "iPad Pro",
      nombre: "Apple iPad Pro",
      precioMinorista: 800,
      precioMayorista: 700,
      marca: "",
      categorias:[],
      descripcion: "El nuevo iPad Pro de Apple es la tablet más poderosa del mercado. Cuenta con un chip M1 ultrarrápido, una pantalla Liquid Retina de 11 pulgadas o 12.9 pulgadas y una batería de larga duración. El iPad Pro también tiene un nuevo diseño con bordes más delgados y una cámara frontal TrueDepth.",
      dimensiones:"asd",
      peso:"asd",
      color:"asd",
      material:"asd",
      paisOrigen:"asd"
    }
  ]
  formActivo:boolean = false;
  idArticuloSelected:string = "";
  articuloSelected:Articulo = {
    categorias: [],
    color: "",
    descripcion: "",
    dimensiones: "",
    id: "",
    marca: "",
    material: "",
    modelo: "",
    nombre: "",
    paisOrigen: "",
    peso: "",
    precioMayorista: 0,
    precioMinorista: 0,
  };

  llenarForm(){
    this.articuloSelected = this.articulos[this.articulos.findIndex((a)=>a.id == this.idArticuloSelected)]
    this.formActivo = true;
  }

  cancelarModificacion(){
    this.idArticuloSelected = "";
    this.articuloSelected = {
      categorias: [],
      color: "",
      descripcion: "",
      dimensiones: "",
      id: "",
      marca: "",
      material: "",
      modelo: "",
      nombre: "",
      paisOrigen: "",
      peso: "",
      precioMayorista: 0,
      precioMinorista: 0,
    };
    this.formActivo = false;
  }

}
