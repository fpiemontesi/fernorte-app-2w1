import {Marca} from "./marca";
import {Categoria} from "./categoria";

export interface Producto {
    id:string;
    codigo:string;
    nombre:string;
    codigo_marca:string;
    categorias_id:string[];
    precio_compra:number;
    precio_minorista:number;
    precio_mayorista:number;
    descripcion:string;
    dimensiones:string;
    peso:string;
    color:string;
    material:string;
    paisOrigen:string;
    imageURL:string;
    activo:boolean;
}
