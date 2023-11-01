import { Component } from '@angular/core';
import { reservation } from '../../models/reservation';
import { reservationDetail } from '../../models/reservation-detail';
import { ReservationService } from '../../services/reservation.service';
import { Subscription } from 'rxjs';
import { stock } from '../../models/stock';

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
          this.getStock(detail.batch.id_existence);
        });
      } 
    else {
      this.reservationDetails = [];
    }
  }

  //el chat me ayudo a mejorar el codigo porque cuando habia 2 detalles con el mismo nombre de producto
  //no me mostraba el nombre del segundo.

  getStock(id:number){
    this.subscription.add(
      this.reservationService.getStockById(id).subscribe({
        next:(stockResponse : stock)=>{
          this.assignProductNameToDetails(id, stockResponse.name);
        }
      })
    )
  }
  
  assignProductNameToDetails(id_existence: number, name: string) {
    this.reservationDetails.forEach((detail) => {
      if (detail.batch.id_existence === id_existence) {
        detail.productName = name;
      }
    });
  }
}
