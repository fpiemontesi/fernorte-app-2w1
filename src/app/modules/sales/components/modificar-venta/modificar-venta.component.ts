import { Component, OnInit, ViewChild } from '@angular/core';
import { VentasService } from '../../services/ventas.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'fn-modificar-venta',
  templateUrl: './modificar-venta.component.html',
  styleUrls: ['./modificar-venta.component.css']
})
export class ModificarVentaComponent implements OnInit{

  ventaId!: number;
  venta: any;
  productos : any[] = [];
  productosVenta : any[] = [];
  filas: any[] = [];
  myList: any[] = [];
  @ViewChild('form', { static: false })
  form!: NgForm;
  action!: string; 


  constructor(private service: VentasService, private route: ActivatedRoute){
    this.ventaId= this.service.obtenerId();
  }
    
  listarClientes(){
    this.service.getClientes().subscribe(data => {
      this.myList= data.results;
    })
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.ventaId = +idParam;
        this.loadData();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo cargar el id de la venta',
        });
      }
    });
  }
  loadData(): void {
    this.service.getVentaById(this.ventaId).subscribe(
      (data) => {
        this.venta = data; // Asigna los datos directamente a la instancia de la clase Ventas
      },
      (error) => {
        console.error('Error al cargar los datos de la venta', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar los datos de la venta',
        });
      }
    );
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
    if (
      this.venta.detalles.producto !== 0 &&
      this.venta.detalles.cantidad !== 0 &&
      this.venta.detalles.cantidad !== null
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
  getPrecioUnitario(productoSeleccionado: string): string | undefined {
    const productoEnLista = this.myList.find((item) => item.name === productoSeleccionado);
    return productoEnLista?.species;
  }
  guardarModificacion(){
    if(!this.onSubmit())
    {
      return ;
    }
    
  }
}

