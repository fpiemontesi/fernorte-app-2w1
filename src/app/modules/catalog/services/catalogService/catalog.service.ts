import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Producto} from "../../models/producto";
import {Categoria} from "../../models/categoria";
import {Catalog} from "../../models/catalog";
import {CatalogDTO} from "../../components/dtos/catalog-dto";

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(private client:HttpClient) { }

  getAllCatalogs():Observable<Catalog[]>{
    return this.client.get<Catalog[]>("http://localhost:8080/api/catalogs");
  }

  getCatalogByCode(code:string):Observable<CatalogDTO>{
    return this.client.get<CatalogDTO>("http://localhost:8080/api/catalogs/"+code);
  }
  postCatalog(catalog: Catalog): Observable<Catalog> {
    return this.client.post<Catalog>("http://localhost:8080/api/catalogs", catalog)
  }

  updateCatalog(code:string, catalog:Catalog):Observable<Catalog>{
    return this.client.put<Catalog>("http://localhost:8080/api/catalogs/"+code, catalog);
  }

  deleteCatalog(code:string):Observable<Catalog>{
    return this.client.delete<Catalog>("http://localhost:8080/api/catalogs/"+code);
  }
}
