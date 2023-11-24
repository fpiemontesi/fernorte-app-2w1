// Objetivo: Modelo para pre carga de productos
export interface ProductoPreCarga {
    descripcion:string;
    imageURL:string;
    dimensiones:string;
    peso:string;
    material:string;
    color:string;
    paisOrigen:string;
    codigo_marca:string;
    codigo_categorias:string[];
    activo:boolean;
}
