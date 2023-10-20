export class Cliente {
    id:number;
    nombre:string;
    apellido:string;
    email:string;
    telefono:number;
    cant_puntos:number;

    constructor(){
        this.id = 0;
        this.nombre = '';
        this.apellido = '';
        this.email = '';
        this.telefono = 0;
        this.cant_puntos = 0;
    }
}