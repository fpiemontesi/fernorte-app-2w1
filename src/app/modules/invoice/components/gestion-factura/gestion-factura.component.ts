import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'fn-gestion-factura',
  templateUrl: './gestion-factura.component.html',
  styleUrls: ['./gestion-factura.component.css']
})
export class GestionFacturaComponent {


  invoices: any; // Declarar una variable para almacenar las facturas

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // Realizar una solicitud GET para obtener el JSON
    this.http.get('https://my-json-server.typicode.com/113949-Galindo-Maximo/invoice/invoices').subscribe((data: any) => {
      this.invoices = data.invoices;
      console.log(this.invoices.id)
    });
  }

}
