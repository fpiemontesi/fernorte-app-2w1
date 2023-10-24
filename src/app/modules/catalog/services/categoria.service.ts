import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoria: Categoria = {} as Categoria
  data: any;

  constructor(private http: HttpClient) { }
  get(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>("http://localhost:8080/categorias")
  }

  create(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>("http://localhost:8080/crearCategoria", categoria)
  }

  update(id: string, categoria: Categoria): Observable<Categoria> {
    console.log('ID update(): '+id)
    return this.http.put<Categoria>('http://localhost:8080/modificarCategoria/'+id, categoria)
  }

  delete(id: string): Observable<Categoria> {
    return this.http.delete<Categoria>("http://localhost:8080/eliminarCategoria/" + id)
  }

  guardarCategoria(categoria: Categoria) {
    this.categoria = categoria
  }

  obtenerCategoria(): Categoria {
    return this.categoria
  }
}
