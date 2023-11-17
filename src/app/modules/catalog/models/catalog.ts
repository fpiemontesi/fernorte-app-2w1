import {Producto} from "./producto";

export interface Catalog {
  codigo:string;

  nombre : string;

  descripcion:string;

  productos_asociados:string[];
}
