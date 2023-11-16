import { Component } from '@angular/core';
import { reservation } from '../../models/reservation';
import { reservationDetail } from '../../models/reservation-detail';
import { ReservationService } from '../../services/reservation.service';
import { Subscription } from 'rxjs';
import { Existence } from '../../models/existence';

@Component({
  selector: 'fn-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent {

  private subscription = new Subscription();

  reservations: reservation[]=[];
  selectedReservation: number;
  reservationDetails: reservationDetail[] =[];

  constructor(private reservationService : ReservationService){
    this.selectedReservation = 0;
  }

  ngOnInit(){
    this.getReservations();
  }

    getReservations(){
    this.subscription.add(
      this.reservationService.getReservations().subscribe({
        next:(reservationResponse : reservation[])=>{
          this.reservations=reservationResponse;
        }
      })
    )
  }

  selectReservation(){
    const selectedReserv = this.reservations.find(r => r.id === +this.selectedReservation);
    if (selectedReserv) {
        this.reservationDetails = selectedReserv.details;
        this.reservationDetails.forEach((detail) => {
            this.getStock(detail.batch.existenceCode);
        });
      } 
    else {
      this.reservationDetails = [];
    }
  }

  //el chat me ayudo a mejorar el codigo porque cuando habia 2 detalles con el mismo nombre de producto
  //no me mostraba el nombre del segundo.

  getStock(code: string) {
    this.subscription.add(
      this.reservationService.getStockById(code).subscribe({
        next: (stockResponse: Existence[]) => {
          // --- ACORDATE JSON-SERVER BUSCAR QUERYPARAM (STRING EL ID) TRAE UN ARRAY ---
            const firstStock = stockResponse[0]; // Accede al primer elemento

            this.assignProductNameToDetails(code, firstStock.name);
        },
        error: (error) => {
          console.error("Error al llamar a la API:", error);
        }
      })
    );
  }
  
  assignProductNameToDetails(codeExistence: string, name: string) {
    this.reservationDetails.forEach((detail) => {
      if (detail.batch.existenceCode === codeExistence) {
        detail.productName = name;
      }
    });
  }

}
