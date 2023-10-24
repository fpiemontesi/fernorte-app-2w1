import {Marca} from "./marca";
import {Categoria} from "./categoria";

export interface Producto {
    id:string;
    codigo:string;
    nombre:string;
    marca:Marca;
    categorias:Categoria[];
    precio_minorista:number;
    precio_mayorista:number;
    descripcion:string;
    dimensiones:string;
    peso:string;
    color:string;
    material:string;
    paisOrigen:string;
    activo:boolean;
}
