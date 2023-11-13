import { Component } from '@angular/core';

@Component({
  selector: 'fn-home-clients',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(){}

  isLogged: boolean = true;
  showLoginForm: boolean = false;

  onLoginSuccess() {
    this.isLogged = true;
    this.showLoginForm = false; // Oculta el formulario de inicio de sesión después de iniciar sesión
  }
  
  ngOnInit(): void {
    let authToken = localStorage.getItem('tokenLogin');
    if (authToken) {
      // Token encontrado en localStorage, el usuario está autenticado
      this.isLogged = true;
      this.showLoginForm = false
    } else{
      this.isLogged = false;
      this.showLoginForm = true
    }
  }
  visibilityState: { [key: string]: boolean } = {
    mostrarComponentesClientes: false,
    mostrarComponentesUsuarios: false,
    mostrarComponenteTurnero: false,
  };

  toggleComponent(component: string) {
    this.visibilityState[component] = !this.visibilityState[component];
  }

  isComponentVisible(component: string) {
    return this.visibilityState[component];
  }

}
