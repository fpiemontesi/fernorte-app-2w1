import { Producto } from "../../models/producto";

export interface DiscountDtoProducto {
    codigo: string;
    nombre: string;
    descripcion: string;
    precio_min: number;
    activo: boolean;
    producto: Producto;
}
