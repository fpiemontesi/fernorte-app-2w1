import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  subMenuItems = [
    { nombreItem: 'Proveedores', routerLink: '' },
    { nombreItem: 'Pedido de cotizacion', routerLink: '' },
    { nombreItem: 'Orden de compra', routerLink: '' }
  ];

  menuVisible = true;

  ngOnInit() {
    this.detectScreenSize();
  }

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  isSmallScreen = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.detectScreenSize();
  }

  detectScreenSize() {
    this.isSmallScreen = window.innerWidth < 768; // Puedes ajustar el valor según tu diseño
  }

}
