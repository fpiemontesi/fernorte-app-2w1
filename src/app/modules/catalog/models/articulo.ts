import {Marca} from "./marca";
import {Categoria} from "./categoria";

export interface Articulo {
    id:string;
    modelo:string;
    nombre:string;
    marca:Marca;
    categorias:Categoria[];
    precioMinorista:number;
    precioMayorista:number;
    descripcion:string;
    dimensiones:string;
    peso:string;
    color:string;
    material:string;
    paisOrigen:string;
}
