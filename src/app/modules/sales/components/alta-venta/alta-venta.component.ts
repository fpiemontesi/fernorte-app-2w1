import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'fn-alta-venta',
  templateUrl: './alta-venta.component.html',
  styleUrls: ['./alta-venta.component.css']
})
export class AltaVentaComponent {
  productos : any[] = [];
  productosVenta : any[] = [];

  filas: any[] = [];

  formData: any = {
    fecha: new Date().toISOString().split('T')[0],
    cliente: '',
    tipo: '',
    formaEntrega: '',
    vendedor: '',
    producto: '',
    cantidad: 0
  };

  myList: any[] = [];

  constructor(private http: HttpClient) { }

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
    // Utiliza el índice para eliminar la fila del arreglo
    this.filas.splice(index, 1);
    this.productos.splice(index, 1);
    this.productosVenta.splice(index ,1)
  }

  onSubmit(){
    console.log("hola");
  }

  agregarFila(): void {
    const producto = document.getElementById("producto") as HTMLSelectElement;
    // Aquí debes agregar una nueva fila a tu arreglo de filas
    if(!this.ValidarProducto()){
      return;
    }
    const productoSeleccionado = producto.options[producto.selectedIndex].text;
    if (this.filas.some((fila) => fila.producto === productoSeleccionado)) {
    // Producto duplicado, muestra una alerta
    alert('Este producto ya ha sido agregado.');
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
      id_producto: producto.options[producto.selectedIndex].value,
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
  ValidarProducto(){
    if(this.formData.producto != 0 && this.formData.cantidad != 0 && this.formData.cantidad != null){
      return true;
    }
    alert("Debe seleccionar un producto y una cantidad");
    return false;
  }

  ValidarPresupuesto(){
    const fechaHoy = new Date(); // Obten la fecha actual
    const fechaAyer = new Date(fechaHoy);
    fechaAyer.setDate(fechaAyer.getDate() - 1);
    if(this.formData.fecha != '' && 
        new Date(this.formData.fecha) > fechaAyer  && 
        this.formData.cliente != '' && 
        this.formData.tipo != '' && 
        this.formData.formaEntrega != '' &&
        this.formData.vendedor != '' && this.filas.length > 0){
          alert("Presupuesto valido");
          this.formData.producto = 0;
          this.formData.cantidad = 0;
          this.formData.fecha = Date();
          this.formData.cliente = '';
          this.formData.tipo = '';
          this.formData.formaEntrega = '';
          this.formData.vendedor = '';

      return true;
    }
    else{
      
      alert("Complete los campos");
      return false;
    }
   
  }

  getPrecioUnitario(productoSeleccionado: string): string | undefined {
    const productoEnLista = this.myList.find(item => item.name === productoSeleccionado);
    if (productoEnLista) {
      return productoEnLista.species;
    }
    return undefined; // Si no se encuentra el producto, puedes manejarlo de acuerdo a tus necesidades.
  }

  realizarSolicitudPostPresupuesto() {
    if(!this.ValidarPresupuesto()){
      return;
    }
    const url = 'http://localhost:8080/presupuesto/Save'; 
    const cliente = document.getElementById("cliente") as HTMLSelectElement;
    const body = {
      nro_presupuesto: "",
      cliente: cliente.options[cliente.selectedIndex].textContent,
      fecha_creacion: new Date().toISOString(),
      fecha_vencimiento: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      productos: this.productos
    };
    console.log(body);
    console.log(this.formData)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.http.post(url, body, httpOptions)
      .subscribe(response => {
        console.log('Solicitud POST exitosa. Respuesta:', response);
      }, error => {
        console.error('Error al realizar la solicitud POST:', error);
      });
  }

  realizarSolicitudPostVenta() {
    if(!this.ValidarPresupuesto()){
      return;
    }
    const url = 'http://localhost:8080/ventas/save'; 
    const cliente = document.getElementById("cliente") as HTMLSelectElement;
    const forma_entrega = document.getElementById("formaEntrega") as HTMLSelectElement;
    const tipo_venta = document.getElementById("tipo") as HTMLSelectElement;
    const vendedor = document.getElementById("vendedor") as HTMLSelectElement;
    const body = {
      fecha: new Date().toISOString(),
      id_cliente : cliente.value,
      tipo_venta : tipo_venta.value,
      forma_entrega : forma_entrega.value,
      fecha_entrega:  new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      id_vendedor : vendedor.value,
      detalles: this.productosVenta
    };
    console.log(body);
    console.log(this.formData)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.http.post(url, body, httpOptions)
      .subscribe(response => {
        console.log('Solicitud POST exitosa. Respuesta:', response);
      }, error => {
        console.error('Error al realizar la solicitud POST:', error);
      });
  }
}
