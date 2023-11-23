import { Producto } from "../../models/producto";

export interface CatalogDTO {
    codigo: string;
    nombre: string;
    descripcion: string;
    productos_asociados: Producto[];
}
