import { Observable } from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Marca} from "../../models/marca";
import { BrandDto } from "../../components/dtos/brand-dto";

@Injectable({
  providedIn: 'root'
})


export class ServiceMarcaService {
  marca:Marca= {} as Marca
  data:BrandDto = {} as BrandDto

  constructor(private http:HttpClient) { }
  get():Observable<Marca[]>{
    return this.http.get<Marca[]>("http://localhost:8080/api/brands")
  }

  getByCode(code:string):Observable<Marca>{
    return this.http.get<Marca>("http://localhost:8080/api/brands/" + code);
  }
  create(marca:Marca):Observable<Marca>{
    return this.http.post<Marca>("http://localhost:8080/api/brands",marca)
  }
  update(marca:Marca):Observable<Marca>{
    console.log("Marca en service"+this.marca.nombre)
    this.data = {
      nombre: marca.nombre
    }
    return this.http.put<Marca>("http://localhost:8080/api/brands/"+marca.codigo,this.data)
  }
  delete(id:string):Observable<Marca>{
    return this.http.delete<Marca>("http://localhost:8080/api/brands/" +id)
  }

  guardarMarca(marca:Marca){
    this.marca = marca
  }
  obtenerMarca():Marca{
    return this.marca
  }

}
