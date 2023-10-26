import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fn-home-catalog',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  ngOnInit(): void {
  }

  constructor() {
  }

  listmarca=true
  formmarca= false
  modificarmarca=false

  vermodificar(){
    this.listmarca=false
    this.formmarca=false
    this.modificarmarca=true
  }
  verlist(){
    this.listmarca = true
    this.formmarca = false
    this.modificarmarca =false

  }

  verform(){
    this.listmarca=false
    this.formmarca=true
    this.modificarmarca=false
  }

}
