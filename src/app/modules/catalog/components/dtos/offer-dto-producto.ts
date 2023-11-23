import { Producto } from "../../models/producto";

export interface OfferDtoProducto {
    codigo: string;
    nombre: string;
    descripcion: string;
    precio_oferta: number;
    activo: boolean;
    puntos: number;
    producto: Producto;
}
