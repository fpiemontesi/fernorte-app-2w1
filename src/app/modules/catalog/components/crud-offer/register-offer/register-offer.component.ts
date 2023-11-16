import { Component } from '@angular/core';
import { Offer } from '../../../models/offer';
import { Producto } from '../../../models/producto';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { OfferService } from '../../../services/offerService/offer.service';
import { productService } from '../../../services/productService/product.service';
import { OfferDto } from '../../dtos/offer-dto';

@Component({
  selector: 'fn-register-offer',
  templateUrl: './register-offer.component.html',
  styleUrls: ['./register-offer.component.css']
})
export class RegisterOfferComponent {
  offer:OfferDto = {} as OfferDto;
  lstProductos:Producto[] = []
  alert:boolean = false;
  private subscription = new Subscription();
  constructor(private offerService:OfferService, private router:Router, private pService:productService){}

  ngOnInit(): void {
    this.pService.getAllProducts().subscribe({
      next: (data : Producto[]) =>{
        this.lstProductos = []
        data.forEach(p => {
          if(p.activo==true){
            this.lstProductos.push(p)
          }
        })

      },
      error: () => {
        alert("error")
      }
    })
  }
  
  cleanForm(){
    this.offer = {} as Offer
    this.router.navigate(["/listOffers"])
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()

  }

  agregarMarca(){
    this.subscription.add(
      this.offerService.create(this.offer).subscribe({
        next: async (offer:OfferDto)=>{
          await this.toggleAlert()
          this.offer = {} as OfferDto
          this.router.navigate(["listOffers"])
        },
        error:()=>{
          alert("Ocurrio un error")
        }
      })
    )
  }

  toggleAlert(): Promise<void> {
    this.alert = !this.alert;

    if (this.alert) {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.alert = false;
          resolve();
        }, 5000);
      });
    } else {
      return Promise.resolve();
    }
  }

}
