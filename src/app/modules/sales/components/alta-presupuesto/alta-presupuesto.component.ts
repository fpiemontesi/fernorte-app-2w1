import { Component , OnInit, ViewChild } from '@angular/core';
import { HttpClient  , HttpHeaders} from '@angular/common/http';
import { PresupuestoService } from '../../services/presupuesto.service';
import { VentasService } from '../../services/ventas.service';
import { Producto } from '../../models/Producto';
import { Cliente } from '../../models/Cliente';
import { Presupuesto } from '../../models/Presupuesto';
import { Detalle } from '../../models/Detalles';
import { Categoria } from '../../models/Categoria';

@Component({
  selector: 'fn-alta-presupuesto',
  templateUrl: './alta-presupuesto.component.html',
  styleUrls: ['./alta-presupuesto.component.css']
})
export class AltaPresupuestoComponent {
  tipo_venta = [
    {valor: 1, descripcion: 'Minorista'}, 
    {valor: 2, descripcion: 'Mayorista'}
  ];
  formas_entrega = [
    {valor: 1, descripcion: 'En caja'}, 
    {valor: 2, descripcion: 'En depósito'}
  ];
  //lista de productos
  productos: Producto[] = [];
  //clase presupuesto
  presupuesto: Presupuesto = new Presupuesto();
  //cliente nullable
  cliente: Cliente = new Cliente();
  nombre_cliente = 'CONSUMIDOR FINAL';

  productoSeleccionado: Producto = new Producto();
  precio_producto: number = 0;
  cantidad: number = 1;

  tipo_activado: boolean = true;
  existencias: number = 0;
  categoria: Categoria = new Categoria("NORMAL", 0)
  total: number = 0;
  subtotal: number = 0;

  constructor(private http: HttpClient , private presupuestoService: PresupuestoService , private ventasService: VentasService) {
   }  

  action!: string; 

  onSubmit() {
  }

  ngOnInit() {
    this.Listar();
    console.log('listado');
    this.presupuesto.tipo_venta = 1;
    this.cliente.nombre = 'CONSUMIDOR FINAL';
  }

  Listar() {
    this.presupuestoService.getProductos().subscribe((data: any) => {
      this.productos = data;
    })
  }
 
  eliminarFila(index: number): void {
    this.presupuesto.detalles.splice(index, 1);
    this.calcularTotales();
    if(this.presupuesto.detalles.length == 0){
      this.tipo_activado = true;
    }
  }

  agregarFila(): void {
    if(!this.valido()){
      return;
    }
    this.tipo_activado = false;
    var detalle = new Detalle();
    detalle.cantidad = this.cantidad;
    detalle.cod_producto = this.productoSeleccionado.codigo
    if(this.presupuesto.tipo_venta == 1){
      detalle.precio_unitario = this.productoSeleccionado.precio_minorista;
    } else if(this.presupuesto.tipo_venta == 2){
      detalle.precio_unitario = this.productoSeleccionado.precio_mayorista;
    }
    detalle.descripcion = this.productoSeleccionado.descripcion;
    this.presupuesto.detalles.push(detalle);
    this.calcularTotales();
  }

  calcularTotales(){
    this.subtotal = 0
    this.total = 0

    for(var i = 0; i < this.presupuesto.detalles.length; i++){
      this.subtotal += this.presupuesto.detalles[i].cantidad * this.presupuesto.detalles[i].precio_unitario;
    }

    if (this.categoria.descuento == 0) {
      this.total = this.subtotal;
    } else {
      this.total = this.subtotal - this.calcularDescuentos();
    }
  }

  calcularDescuentos() : number{
    var descuento = 0;
    var gananciaTotal = 0;
    for(var i = 0; i < this.presupuesto.detalles.length; i++){
      for(var j = 0; j < this.productos.length; j++){
        if(this.presupuesto.detalles[i].cod_producto === this.productos[j].codigo){
          gananciaTotal += this.presupuesto.detalles[i].precio_unitario - this.productos[j].precio_compra;
        }
      }
    }
    console.log("Ganancia total: " + gananciaTotal);
    console.log("Porcentaje sobre ganancia:" + this.categoria.descuento);
    descuento = this.categoria.descuento * gananciaTotal / 100;
    console.log("Descuento: " + descuento);
    return descuento;
  }
  
  valido(): boolean{
    return true;
  }

  guardarPresupuesto() {
    this.presupuestoService.realizarSolicitudPostPresupuesto(this.presupuesto).subscribe((response) => {
      console.log(response);
    })
  }

  guardarVenta() {
    
  }

  actualizarPrecio(){
    if(this.presupuesto.tipo_venta == 1){
      this.precio_producto = this.productoSeleccionado.precio_minorista; 
    } else if(this.presupuesto.tipo_venta == 2){
      this.precio_producto = this.productoSeleccionado.precio_mayorista;
    }
  }

  consultarExistencia(){
    console.log("Se llama a la funcion")
    const producto = this.productoSeleccionado;
    console.log(this.productoSeleccionado);
    this.presupuestoService.getExistenciaByCodProducto(producto.codigo).subscribe((response) => {
      if(response.length != 0){
        this.existencias = response[0].total; 
        console.log("Existencias consultadas")
        this.actualizarPrecio();
      } else{
        this.existencias = 0
      }
    });
  }

  Clean() {
  }
  
  onBlur(){
    var doc = this.cliente.nro_doc;
    try {
      this.presupuestoService.getClienteByDni(doc).subscribe((response) => {
        if(response.length != 0){
          this.cliente.nombre = response[0].nombre;
          this.cliente.apellido = response[0].apellido;
          this.cliente.cant_puntos = response[0].cant_puntos;
          this.cliente.nro_doc = response[0].nro_doc;
          this.categoria = this.cliente.calcularCategoria();
          this.nombre_cliente = this.cliente.apellido + ", " + this.cliente.nombre;
          this.calcularTotales();
          console.log("Cliente consultado");
        }
        else{
          this.cliente = new Cliente();
          this.nombre_cliente = "CONSUMIDOR FINAL";
          this.categoria = this.cliente.calcularCategoria();
          console.log(this.categoria.nombre)
          this.calcularTotales();
        }
      });
    } catch (error) {
      
    } finally{
      
    }
  }
}