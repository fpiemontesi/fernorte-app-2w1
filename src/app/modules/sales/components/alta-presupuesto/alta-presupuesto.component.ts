import { Component , OnInit, ViewChild } from '@angular/core';
import { HttpClient  , HttpHeaders} from '@angular/common/http';
import { PresupuestoService } from '../../services/presupuesto.service';
import { VentasService } from '../../services/ventas.service';
import { Producto } from '../../models/Producto';
import { Cliente } from '../../models/Cliente';
import { Presupuesto } from '../../models/Presupuesto';
import { Detalle } from '../../models/Detalles';
import { Categoria } from '../../models/Categoria';
import { FormBuilder,Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Ventas } from '../../models/Ventas';
import { Descuento } from '../../models/Descuento';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fn-alta-presupuesto',
  templateUrl: './alta-presupuesto.component.html',
  styleUrls: ['./alta-presupuesto.component.css']
})
export class AltaPresupuestoComponent implements OnInit {
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
  cliente: Cliente = new Cliente();
  nombre_cliente = 'CONSUMIDOR FINAL';

  productoSeleccionado: Producto = new Producto();
  precio_producto: number = 0;
  cantidad: number = 1;

  fecha:Date = new Date();
  tipo_activado: boolean = true;
  existencias: number = 0;
  categoria: Categoria = new Categoria("NORMAL", 0)
  total: number = 0;
  subtotal: number = 0;
  boton_agregar = false;


  //variable que identifica si el presupuesto a crear viene del boton generar venta de Consultar Presupuesto:
  ventaFromPresupuesto:boolean = false;
  
  constructor(private http: HttpClient , private presupuestoService: PresupuestoService , 
    private ventasService: VentasService, private fb:FormBuilder,private route: ActivatedRoute) {
      this.route.queryParams.subscribe(params => {
        if(params['venta_from_presupuesto'] == "true") this.ventaFromPresupuesto=true;
      });
   }  


  action!: string; 

  onSubmit() {
    
  }

  ngOnInit() {
    this.Listar();
    console.log('listado');
    // Si el presupuesto viene de generar venta:
    if(this.ventaFromPresupuesto){
      this.presupuesto = this.presupuestoService.MostrarPresupuesto();
      console.log("Se detecto que viene de generar venta, presupuesto a usar:",this.presupuesto);
      this.cliente.nro_doc = this.presupuesto.doc_cliente;
      this.onBlur(true);
      //TODO: Realizar los descuentos a los productos que ya venian cargados.

    }
    // Sino:
    else{
      this.presupuesto.tipo_venta = 1;
      this.cliente.nombre = 'CONSUMIDOR FINAL';
    }
  }

  Listar() {
    this.presupuestoService.getProductos().subscribe((data: any) => {
      if(data.length !=0){
        this.productos = data;
        this.productoSeleccionado = this.productos[0];
        this.consultarExistencia();
      }
      
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
    for (let index = 0; index < this.presupuesto.detalles.length; index++) {
      if(this.presupuesto.detalles[index].cod_producto==this.productoSeleccionado.codigo){
        return
      }
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
    detalle.descripcion = this.productoSeleccionado.nombre;
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

  validarCantidad(){
    if(this.cantidad <= 0){
      this.boton_agregar = false;
    } else{
      this.boton_agregar = true;
    }
  }

  guardarPresupuesto() {
      this.presupuestoService.realizarSolicitudPostPresupuesto(this.presupuesto).subscribe((response) => {
        console.log(response);
        Swal.fire({
          title: "Exito!",
          text: "Se ha guardado el presupuesto",
          icon: "success",
          timer:2000
        });
      },
     (error) =>{
        console.error(error)
        Swal.fire({
          title: "Ha habido un problema!",
          text: "No se ha guardado el presupuesto",
          icon: "error",
          timer:2000
        });
      }
    )
  }

  guardarVenta() {
    var venta = new Ventas();
    venta.detalles = this.presupuesto.detalles;
    venta.doc_cliente = this.cliente.nro_doc;
    venta.estado = 1;
    venta.id_vendedor = 1;
    venta.fecha = new Date();
    venta.fecha_entrega = new Date();
    venta.descuentos = [new Descuento()];
    venta.descuentos[0].monto = this.calcularDescuentos();
    venta.descuentos[0].descripcion = "Descuento por cliente " + this.categoria.nombre;
    venta.forma_entrega = 1;
    venta.tipo_venta = this.presupuesto.tipo_venta;

    console.log(venta);

    this.ventasService.realizarSolicitudPostVenta(venta).subscribe((response) => {
      console.log(response);
      Swal.fire({
        title: "Exito!",
        text: "Se ha guardado la venta",
        icon: "success",
        timer:2000
      });
    })
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
  
  onBlur(valid:any){
    if(valid!){
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
            this.cliente.nro_doc=doc;
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
}
