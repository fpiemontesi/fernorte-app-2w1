import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  private usuariosSubject = new BehaviorSubject<any[]>([]);
  usuarios$: Observable<any[]> = this.usuariosSubject.asObservable();

  getUsuarios(): any[] {
    return this.usuariosSubject.value;
  }

  agregarUsuario(usuario: any) {
    const usuarios = this.usuariosSubject.value;
    usuarios.push(usuario);
    this.usuariosSubject.next(usuarios);
  }
}
