import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Categoria } from '../../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoria: Categoria = {} as Categoria
  data: any;

  constructor(private http: HttpClient) { }
  get(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>("http://localhost:8080/api/categories")
  }

  getByCode(code:string): Observable<Categoria> {
    return this.http.get<Categoria>("http://localhost:8080/api/categories/"+code)
  }

  create(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>("http://localhost:8080/api/categories", categoria)
  }

  update(id: string, categoria: Categoria): Observable<Categoria> {
    console.log('ID update(): '+id)
    return this.http.put<Categoria>('http://localhost:8080/api/categories/'+id, categoria)
  }

  delete(id: string): Observable<Categoria> {
    return this.http.delete<Categoria>("http://localhost:8080/api/categories/" + id)
  }

  guardarCategoria(categoria: Categoria) {
    this.categoria = categoria
  }

  obtenerCategoria(): Categoria {
    return this.categoria
  }
}
