import { Component , ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient  , HttpHeaders} from '@angular/common/http';
import Swal from 'sweetalert2'
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PresupuestoService } from '../../services/presupuesto.service';
import { VentasService } from '../../services/ventas.service';
import { Producto } from '../../models/Producto';
import { Cliente } from '../../models/Cliente';
import { Presupuesto } from '../../models/Presupuesto';
import { Detalle } from '../../models/Detalles';
import { Subscription } from 'rxjs';

@Component({
  selector: 'fn-modificar-presupuesto',
  templateUrl: './modificar-presupuesto.component.html',
  styleUrls: ['./modificar-presupuesto.component.css']
})
export class ModificarPresupuestoComponent {

  constructor(private http: HttpClient ,private router : Router , private presupuestoService: PresupuestoService , private ventasService: VentasService) { }
  

  
  
  clienteName: any = '';
  filas: Detalle[] = [];
  subscriptions: Subscription | undefined;
  existencias: number = 0;
  nro_doc: number = 0;
  nombre_cliente: string = '';
  cliente: Cliente = new Cliente();
  totalPresupuesto: number = 0;
  totalPorProducto: number = 0;
  dimension?: string = "";
  peso?: string = "";
  tipo_activado: boolean = true;
  categoria: string = '';
  descuento: number = 0;
  presupuesto : Presupuesto = new Presupuesto();
  formData: any = {
    fecha: new Date().toISOString().split('T')[0],
    cliente: 0,
    tipo: 1,
    formaEntrega: 1,
    vendedor: 1,
    producto :'',
    cantidad: 1
  };
  @ViewChild('nro_doc_input', { static: false }) nro_doc_input!: ElementRef;
  myList: Producto[] = [];
  @ViewChild('form', { static: false })
  form!: NgForm;
  

  action!: string; 

  onSubmit() {
    if (this.form.valid) {
      return true;
    }
    return false;
  }

  ngOnInit() {
    this.subscriptions = new Subscription();
    this.Listar();
    this.CargarDatos();
    this.onBlur();  
  }
  ngOnDestroy(){
    if(this.subscriptions){
      this.subscriptions.unsubscribe();
    }
  }

  Listar() {
    this.subscriptions!.add(
    this.presupuestoService.getProductos().subscribe((data: any) => {
      this.myList = data;
    }))
  }
 
  eliminarFila(index: number): void {
    this.filas.splice(index, 1);
    if(this.filas.length == 0){
      this.tipo_activado = true;
    }
  }

  agregarFila(event : Event): void {
    event.preventDefault();
    const producto = document.getElementById("producto") as HTMLSelectElement;
    if (!this.presupuestoService.validarProducto(this.formData)) {
      return;
    }
    const productoSeleccionado = producto.options[producto.selectedIndex].text;
    if (this.filas.some((fila) => fila.cod_producto === productoSeleccionado)) {   
      Swal.fire({
        icon: 'warning', // Puedes cambiar el icono a tu elección
        title: 'El producto ya ha sido seleccionado',
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Aceptar'
      });;
    return;
  }
    var precioUnitario = this.getPrecioUnitario(productoSeleccionado);
    this.filas.push({
      cod_producto: producto.value,
      descripcion: producto.options[producto.selectedIndex].text,
      cantidad: this.formData.cantidad,
      precio_unitario : precioUnitario,
      
    });
    this.totalPorProducto =  precioUnitario * this.formData.cantidad;
   
    this.tipo_activado = false;
    console.log(this.presupuesto);
  }

  getPrecioUnitario(productoSeleccionado: string): number {
    const productoEnLista = this.myList.find(item => item.nombre === productoSeleccionado);
    var tipoVenta = document.getElementById("tipo") as HTMLSelectElement;
    if(tipoVenta.value == "1"){
      if (productoEnLista) {
        return productoEnLista.precio_minorista;
      }
    } else if(tipoVenta.value == "2"){
      if (productoEnLista) {
        return productoEnLista.precio_mayorista;
      }
    }
    return 0; 
  }

  CargarDatos(){
    this.presupuesto = this.presupuestoService.MostrarPresupuesto();
    if(this.presupuesto){

      this.nro_doc = this.presupuesto.doc_cliente;
      
      this.filas = this.presupuesto.detalles;
      this.formData.tipo = this.presupuesto.tipo_venta;
    }
    this.onBlur();
  }

  Cancelar(){
    this.router.navigate(['sales/consultar-presupuesto']);
  }

  calcularTotal() : number {
    this.totalPresupuesto = 0;
  
    for (let fila of this.filas) {
      this.totalPresupuesto += this.CacularPrecioTotalporProducto(fila);
    }
    return this.totalPresupuesto;
  }

  CacularPrecioTotalporProducto(fila :any) : number {
    var total = fila.cantidad * fila.precio_unitario;
    return total;
  }

  consultarExistencia(){
    const producto = document.getElementById("producto") as HTMLSelectElement;
    this.dimension = this.myList.at(producto.selectedIndex)?.dimensiones;
    this.peso = this.myList.at(producto.selectedIndex)?.peso;
    this.subscriptions!.add(
    this.presupuestoService.getExistenciaByCodProducto(producto.value).subscribe((response) => {
      if(response.length != 0){
        this.existencias = response[0].total;
      } else{
        this.existencias = 0
      }
    }));
  }

  Clean() {
    this.form.resetForm({ producto: 0 });
    this.filas = [];
    
  }
  
  onBlur(){
    try {
      this.subscriptions!.add(
      this.presupuestoService.getClienteByDni(this.nro_doc).subscribe((response) => {
        if(response.length != 0){
          this.formData.cliente = this.nro_doc;
          this.cliente.nombre = response[0].nombre;
          this.cliente.apellido = response[0].apellido;
          this.cliente.cant_puntos = response[0].cant_puntos;
          this.cliente.nro_doc = response[0].nro_doc;
          this.categoria = this.cliente.calcularCategoria().nombre;
          this.descuento = this.cliente.calcularCategoria().descuento;
          this.nombre_cliente = response[0].apellido + ", " + response[0].nombre;
          console.log("Cliente consultado");
        } else{
          this.formData.cliente = 0;
          this.nombre_cliente = "CONSUMIDOR FINAL";
        }
      }));
    } catch (error) {
      
    }
  }

  UpdatePresupuesto(){
    if(this.onSubmit()){
    this.presupuesto.tipo_venta = this.formData.tipo;
    this.presupuesto.doc_cliente = this.nro_doc;
    this.presupuesto.detalles = this.filas;
    this.subscriptions!.add(
    this.presupuestoService.realizarSolicitudPutPresupuesto(this.presupuesto).subscribe((response) => {
      console.log(response,"se actualizo el presupuesto");
      Swal.fire({
        title: 'Se actualizó el presupuesto',
        text: 'Será redirigido a consultar',
        icon: 'success',
        timer: 2000, 
        showConfirmButton: false, 
      }).then(() => {
        this.router.navigate(['sales/consultar-presupuesto']);
      });
    }));
    }
    else return;
    
      
  }
    
}



