export class Proveedor {
  
  nombre: string;
  cuit : string;
  iva : string
  email: string;
  telefono: string;
  provincia : string;
  bariio : string;
  localidad : string;

  constructor( nombre: string, email: string, telefono: string,cuit : string, iva : string,provincia : string,barrio : string,localidad : string) {
    this.iva = iva;
    this.cuit=cuit;
    this.nombre = nombre;
    this.email = email;
    this.telefono = telefono;
    this.bariio=barrio;
    this.provincia=provincia;
    this.localidad=localidad;
  }

}
