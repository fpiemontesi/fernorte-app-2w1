import { Component, OnInit, ViewChild } from '@angular/core';
import { VentasService } from '../../services/ventas.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { PresupuestoService } from '../../services/presupuesto.service';

@Component({
  selector: 'fn-modificar-venta',
  templateUrl: './modificar-venta.component.html',
  styleUrls: ['./modificar-venta.component.css']
})
export class ModificarVentaComponent implements OnInit{

  venta: any = {};
  productos : any[] = [];
  productosVenta : any[] = [];
  filas: any[] = [];
  myList: any[] = [];
  @ViewChild('form', { static: false })
  form!: NgForm;
  action!: string; 
  precio_total_total: number = 0;
  precio_total: number = 0;

  formData: any = {
    fecha: new Date().toISOString().split('T')[0],
    cliente: '',
    tipo: '',
    formaEntrega: '',
    vendedor: '',
    producto :'',
    cantidad: 0
  };

  constructor(private service: VentasService, private http: HttpClient, private presupuestoServ: PresupuestoService) {
   
  }
  ngOnInit(): void {
   console.log(this.service.obtenerVentas());
   console.log(this.service.obtenerVentas().detalles[0].descripcion);
   this.cargarDatosVenta();
  this.ListarArticulos();
    //this.Listar();
  }
    
  cargarDatosVenta() {
    const ventaActual = this.service.obtenerVentas();
    this.formData.cliente = ventaActual.id_cliente;
    this.formData.vendedor = ventaActual.id_vendedor;
    this.formData.tipo = ventaActual.tipo_venta;
    this.formData.formaEntrega = ventaActual.forma_entrega;
    this.precio_total= ventaActual.total;
    for (let i = 0; i < ventaActual.detalles.length; i++) {
      this.filas.push({
        id: ventaActual.detalles[i].id_producto,
        producto: ventaActual.detalles[i].descripcion,
        cantidad: ventaActual.detalles[i].cantidad,
        precio_unitario: ventaActual.detalles[i].precio_unitario,
        precio_total: ventaActual.detalles[i].precio_unitario * ventaActual.detalles[i].cantidad,
      });
    }
    // Inicializa precio_total_total con el valor de la venta actual
    this.precio_total_total = this.precio_total;
  }

// DEBERIA SER CON EL JSON DE ARTICULOS  
  ListarArticulos() {
    this.http.get('http://localhost:3000/articulos')
    .subscribe((data: any) => {
      this.myList = data.map((item: any) => ({
        id_producto: item.id,
        product_nombre: item.product_nombre,
        precio: item.precio_minorista
      }));
      console.log(this.myList);
    });
}
  
// Listar() {
//   this.http.get('https://rickandmortyapi.com/api/character')
//     .subscribe((data: any) => {
//       this.myList = data.results;
//       console.log(this.myList);
//     });
// }
  onSubmit(){
    if (this.form.valid) {
      return true;
    }
    return false;
  }
  eliminarFila(index: number): void {
    this.precio_total_total -= this.filas[index].precio_total;
    this.filas.splice(index, 1);
    this.productos.splice(index, 1);
    this.productosVenta.splice(index, 1);
  }
  agregarFila(event: Event): void {
    event.preventDefault();
    const producto = document.getElementById("producto") as HTMLSelectElement;
  
    // Verifica si el producto es válido
    if (!this.presupuestoServ.validarProducto(this.formData)) {
      return;
    }
  
    const productoSeleccionado = producto.options[producto.selectedIndex].text;
  
    // Comprueba si el producto ya ha sido seleccionado
    if (this.filas.some((fila) => fila.producto === productoSeleccionado)) {
      Swal.fire({
        icon: 'warning',
        title: 'El producto ya ha sido seleccionado',
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
      });
      return;
    }
  
    // Obtiene el precio unitario del producto seleccionado
    const precioUnitario = this.getPrecioUnitario(productoSeleccionado);
  
    if (precioUnitario !== undefined) {
      console.log(precioUnitario);
  
      // Calcula el precio total de la fila
      const precioTotal = this.formData.cantidad * precioUnitario;
  
      // Agrega la fila a la lista de filas
      this.filas.push({
        id: producto.value,
        producto: productoSeleccionado,
        cantidad: this.formData.cantidad,
        precio_unitario: precioUnitario,
        precio_total: precioTotal,
      });
  
      // Agrega el producto a la lista de productos
      this.productos.push({
        id_producto: producto.options[producto.selectedIndex].value,
        descripcion: producto.options[producto.selectedIndex].text,
        cantidad: this.formData.cantidad,
        unidad: 'Kgs',
      });
  
      // Agrega el producto a la lista de productos de venta
      this.productosVenta.push({
        id_producto: producto.options[producto.selectedIndex].value,
        precio_unitario: precioUnitario,
        cantidad: this.formData.cantidad,
      });
  
      // Actualiza el precio_total_total sumando el nuevo precioTotal
      this.precio_total_total += precioTotal;
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'El precio del producto no existe, será asignado por defecto un precio de 1',
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
      });
  
      // Agrega la fila con precio por defecto
      const precioTotalPorDefecto = this.formData.cantidad * 1;
      this.filas.push({
        id: producto.value,
        producto: productoSeleccionado,
        cantidad: this.formData.cantidad,
        precio_unitario: 1,
        precio_total: precioTotalPorDefecto,
      });
  
      // Agrega el producto a la lista de productos
      this.productos.push({
        id_producto: producto.options[producto.selectedIndex].value,
        descripcion: producto.options[producto.selectedIndex].text,
        cantidad: this.formData.cantidad,
        unidad: 'Kgs',
      });
  
      // Agrega el producto a la lista de productos de venta
      this.productosVenta.push({
        id_producto: producto.options[producto.selectedIndex].value,
        precio_unitario: 1,
        cantidad: this.formData.cantidad,
      });
  
      // Actualiza el precio_total_total sumando el nuevo precioTotalPorDefecto
      this.precio_total_total += precioTotalPorDefecto;
    }
  }
  
  
  getPrecioUnitario(productoSeleccionado: string): number | undefined {
    const productoEnLista = this.myList.find((item) => item.product_nombre === productoSeleccionado);
    return productoEnLista?.precio;
  }
  
  guardarModificacion(){
    if(!this.onSubmit())
    {
      return ;
    }
    console.log(this.service.obtenerVentas().id);
    this.service.realizarModificacionVentaa(this.formData)
      .subscribe(
        (response) => {
          console.log('Solicitud PUT exitosa. Respuesta:', response);
          Swal.fire({
            icon: 'success',
            title: 'Se ha modificado la Venta',
            showCancelButton: false,
            showConfirmButton: true,
            confirmButtonText: 'Aceptar'
          });
          this.Clean();
        },
        (error) => {
          console.error('Error al realizar la solicitud PUT:', error);
        }
      );
  }

  Clean() {
    this.form.resetForm({ producto: 0 });
    this.filas = [];
    this.productos = [];
    this.productosVenta = [];
  }
}

