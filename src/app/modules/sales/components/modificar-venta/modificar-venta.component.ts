import { Component, OnInit, ViewChild } from '@angular/core';
import { VentasService } from '../../services/ventas.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

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

  formData: any = {
    fecha: new Date().toISOString().split('T')[0],
    cliente: '',
    tipo: '',
    formaEntrega: '',
    vendedor: '',
    producto :'',
    cantidad: 0
  };

  constructor(private service: VentasService, private http: HttpClient) {
   
  }
  ngOnInit(): void {
   console.log(this.service.obtenerVentas());
   console.log(this.service.obtenerVentas().detalles[0].descripcion);
   this.cargarDatosVenta();
  //this.ListarArticulos();
    this.Listar();
  }
    
  cargarDatosVenta() {
    const ventaActual = this.service.obtenerVentas(); 
    this.formData.cliente = ventaActual.id_cliente;
    this.formData.vendedor = ventaActual.id_vendedor;
    this.formData.tipo = ventaActual.tipo_venta;
    this.formData.formaEntrega = ventaActual.forma_entrega;
    this.formData.producto = ventaActual.detalles[0].descripcion;
    this.formData.cantidad = ventaActual.detalles[0].cantidad;
  }

// DEBERIA SER CON EL JSON DE ARTICULOS  
//   ListarArticulos() {
//     this.http.get('http://localhost:3000/articulos')
//     .subscribe((data: any) => {
//       this.myList = data.map((item: any) => ({
//         id_producto: item.id,
//         producto_nombre: item.product_nombre,
//         precio: item.precio_minorista
//       }));
//       console.log(this.myList);
//     });
// }
  
Listar() {
  this.http.get('https://rickandmortyapi.com/api/character')
    .subscribe((data: any) => {
      this.myList = data.results;
      console.log(this.myList);
    });
}
  onSubmit(){
    if (this.form.valid) {
      return true;
    }
    return false;
  }
  eliminarFila(index: number): void {
    this.filas.splice(index, 1);
    this.productos.splice(index, 1);
    this.productosVenta.splice(index, 1);
  }
  agregarFila(event: Event): void {
    event.preventDefault();
    const producto = document.getElementById("producto") as HTMLSelectElement;
    if (!this.ValidarProducto()) {
      return;
    }
    const productoSeleccionado = producto.options[producto.selectedIndex].text;
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
    const precioUnitario = this.getPrecioUnitario(productoSeleccionado);
    this.filas.push({
      id: producto.value,
      producto: productoSeleccionado,
      cantidad: this.venta.detalles[0].cantidad,
      precio_unitario: precioUnitario,
    });
    this.productos.push({
      id_producto: producto.options[producto.selectedIndex].value,
      descripcion: producto.options[producto.selectedIndex].text,
      cantidad: this.venta.detalles[0].cantidad,
      unidad: 'Kgs',
    });
    this.productosVenta.push({
      id_producto: producto.options[producto.selectedIndex].value,
      precio_unitario: precioUnitario,
      cantidad: this.venta.detalles[0].cantidad,
    });
  }
  ValidarProducto(): boolean {
    // if (
    //   this.venta.detalles.producto !== 0 &&
    //   this.venta.detalles.cantidad !== 0 &&
    //   this.venta.detalles.cantidad !== null
    // ) {
    //   return true;
    // }
    if (
      this.venta.detalles &&
      this.venta.detalles.length > 0 &&
      this.venta.detalles[0].producto !== 0 &&
      this.venta.detalles[0].cantidad !== 0 &&
      this.venta.detalles[0].cantidad !== null
    ) {
      return true;
    }
    Swal.fire({
      icon: 'warning',
      title: 'Seleccione un producto y una cantidad',
      showCancelButton: false,
      showConfirmButton: true,
      confirmButtonText: 'Aceptar',
    });
    return false;
  }
  getPrecioUnitario(productoSeleccionado: string): number | undefined {
    const productoEnLista = this.myList.find((item) => item.producto_name === productoSeleccionado);
    return productoEnLista?.precio_unitario;
}
  guardarModificacion(){
    if(!this.onSubmit())
    {
      return ;
    }
    this.service.realizarModificacionVenta(this.formData, this.productosVenta)
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

