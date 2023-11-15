import {Producto} from "./producto";

export interface Catalog {
  nombre : string;

  descripcion:string;

  productos_asociados:string[];
}
