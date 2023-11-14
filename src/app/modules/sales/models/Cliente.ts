import { Categoria } from "./Categoria";

export class Cliente {
    nro_doc:number;
    nombre:string;
    apellido:string;
    cant_puntos:number;

    constructor(){
        this.nro_doc = 0;
        this.nombre = '';
        this.apellido = '';
        this.cant_puntos = 0;
    }

    calcularCategoria(): Categoria{
        console.log(this.cant_puntos);
        if (this.cant_puntos >= 20 && this.cant_puntos <= 60) {
            return new Categoria('GOLD', 20);
        } else if (this.cant_puntos > 60 && this.cant_puntos < 100) {
            return new Categoria('PLATINUM', 40);
        } else if (this.cant_puntos == 100) {
            return new Categoria('DIAMOND', 70);
        }
        return new Categoria('NORMAL', 0);
    }
}