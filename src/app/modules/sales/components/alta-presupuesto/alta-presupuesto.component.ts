import { Component , OnInit, ViewChild } from '@angular/core';
import { HttpClient  , HttpHeaders} from '@angular/common/http';
import Swal from 'sweetalert2'
import { NgForm } from '@angular/forms';
import { PresupuestoService } from '../../services/presupuesto.service';
import { VentasService } from '../../services/ventas.service';

@Component({
  selector: 'fn-alta-presupuesto',
  templateUrl: './alta-presupuesto.component.html',
  styleUrls: ['./alta-presupuesto.component.css']
})
export class AltaPresupuestoComponent {

  constructor(private http: HttpClient , private presupuestoService: PresupuestoService , private ventasService: VentasService) { }
  

  productos : any[] = [];
  productosVenta : any[] = [];
  clienteName: any = '';
  filas: any[] = [];

  formData: any = {
    fecha: new Date().toISOString().split('T')[0],
    cliente: '',
    tipo: '',
    formaEntrega: '',
    vendedor: '',
    producto :'',
    cantidad: 0
  };
 
  myList: any[] = [];
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
    this.Listar();
  }

  Listar() {
    this.http.get('https://rickandmortyapi.com/api/character')
      .subscribe((data: any) => {
        this.myList = data.results;
        console.log(this.myList);
      });
  }
 
  eliminarFila(index: number): void {
    this.filas.splice(index, 1);
    this.productos.splice(index, 1);
    this.productosVenta.splice(index ,1)
  }

  agregarFila(event : Event): void {
    event.preventDefault();
    const producto = document.getElementById("producto") as HTMLSelectElement;
    
    if (!this.presupuestoService.validarProducto(this.formData)) {
      return;
    }
    const productoSeleccionado = producto.options[producto.selectedIndex].text;
    if (this.filas.some((fila) => fila.producto === productoSeleccionado)) {   
      Swal.fire({
        icon: 'warning', // Puedes cambiar el icono a tu elección
        title: 'El producto ya ah sido seleccionado',
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Aceptar'
      });;
    return;
  }
    this.filas.push({
      id: producto.value,
      producto: producto.options[producto.selectedIndex].text,
      cantidad: this.formData.cantidad,
      precio_unitario : this.getPrecioUnitario(productoSeleccionado),
      //unidad : producto.options[producto.selectedIndex].text,
      //total: this.getPrecioUnitario(productoSeleccionado) * this.formData.cantidad
    });
    this.productos.push({
      producto_id: producto.options[producto.selectedIndex].value,
      descripcion: producto.options[producto.selectedIndex].text,
      cantidad: this.formData.cantidad,
      unidad: 'Kgs'
    })
    this.productosVenta.push({
      id_producto: producto.options[producto.selectedIndex].value,
      precio_unitario: 1,
      cantidad: this.formData.cantidad
    })
    
  }

  getPrecioUnitario(productoSeleccionado: string): string | undefined {
    const productoEnLista = this.myList.find(item => item.name === productoSeleccionado);
    if (productoEnLista) {
      return productoEnLista.species;
    }
    return undefined; 
  }

  realizarSolicitudPostPresupuesto() {
    if(!this.onSubmit())
    {
      return ;
    }
    this.clienteName  = document.getElementById("cliente") as HTMLSelectElement;
      this.presupuestoService.realizarSolicitudPostPresupuesto(this.clienteName.options[this.clienteName.selectedIndex].textContent , this.productos)
      .subscribe(
        (response) => {
          console.log('Solicitud POST exitosa. Respuesta:', response);
          Swal.fire({
            icon: 'success',
            title: 'Se ha guardado el presupuesto',
            showCancelButton: false,
            showConfirmButton: true,
            confirmButtonText: 'Aceptar',
          });
          this.Clean();
        },
        (error) => {
          console.error('Error al realizar la solicitud POST:', error);
          
        }
      );
  }

  realizarSolicitudPostVenta() {
    this.ventasService
      .realizarSolicitudPostVenta(this.formData, this.productosVenta)
      .subscribe(
        (response) => {
          console.log('Solicitud POST exitosa. Respuesta:', response);
          Swal.fire({
            icon: 'success',
            title: 'Se ha guardado la Venta',
            showCancelButton: false,
            showConfirmButton: true,
            confirmButtonText: 'Aceptar'
          });
          this.Clean();
        },
        (error) => {
          console.error('Error al realizar la solicitud POST:', error);
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
