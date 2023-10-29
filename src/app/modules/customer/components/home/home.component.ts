import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'fn-home-clients',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  isLogged: boolean = false;
  showLoginForm: boolean = true;

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

}
