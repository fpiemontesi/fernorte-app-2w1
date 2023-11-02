// export class Cliente {
//     id:number;
//     nombre:string;
//     apellido:string;
//     email:string;
//     telefono:number;
//     cant_puntos:number;

//     constructor(){
//         this.id = 0;
//         this.nombre = '';
//         this.apellido = '';
//         this.email = '';
//         this.telefono = 0;
//         this.cant_puntos = 0;
//     }
// }
export class Cliente {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    domicilio: string;
    id_tipo_doc: {
        id_tipo_doc: number;
        tipo_documento: string;
    };
    nro_doc: number;
    id_categoria_fiscal: {
        id_categoria: number;
        descripcion: string;
    };
    id_tipo_cliente: {
        id_tipo_cliente: number;
        tipo_cliente: string;
    };
    cant_puntos: number;

    constructor() {
        this.id = 0;
        this.nombre = '';
        this.apellido = '';
        this.email = '';
        this.telefono = '';
        this.domicilio = '';
        this.id_tipo_doc = {
            id_tipo_doc: 0,
            tipo_documento: ''
        };
        this.nro_doc = 0;
        this.id_categoria_fiscal = {
            id_categoria: 0,
            descripcion: ''
        };
        this.id_tipo_cliente = {
            id_tipo_cliente: 0,
            tipo_cliente: ''
        };
        this.cant_puntos = 0;
    }
}
