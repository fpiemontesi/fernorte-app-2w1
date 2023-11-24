import { Component } from '@angular/core';
import { OfferDtoProducto } from '../../dtos/offer-dto-producto';
import { Offer } from '../../../models/offer';
import { Subscription } from 'rxjs';
import { productService } from '../../../services/productService/product.service';
import { OfferService } from '../../../services/offerService/offer.service';
import { Producto } from '../../../models/producto';

@Component({
  selector: 'fn-list-offers',
  templateUrl: './list-offers.component.html',
  styleUrls: ['./list-offers.component.css']
})
export class ListOffersComponent {
  lista: OfferDtoProducto[] = [];
  listaproduct: Offer[] = []
  check: boolean = false;
  codigoOffer = "";
  alert: boolean = false;
  private subscription = new Subscription();

  constructor(private offerService: OfferService, private pService: productService) {
  }

  ngOnInit(): void {
    this.loadOffers();
  }

  obtenerNombreProducto(code: string): string {
    const producto = this.listaproduct.find(m => m.codigo === code);
    return producto ? producto.nombre : 'Desconocida';
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  guardarCodigo(codigo: string) {
    this.codigoOffer = codigo;
  }

  eliminarMarca() {
    this.subscription.add(
      this.offerService.delete(this.codigoOffer).subscribe({
        next: async (offer: Offer) => {
          await this.toggleAlert();
          this.loadOffers()
        },
        error: () => {
          alert("error")
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
        }, 1000);
      });
    } else {
      return Promise.resolve();
    }
  }

  loadOffers() {
    if (this.check == false) {
      this.subscription.add(
        this.offerService.get().subscribe({
          next: (offer: OfferDtoProducto[]) => {
            this.lista = []
            offer.forEach(o => {
              if (o.activo == true) {
                this.lista.push(o)
              }
            })
          },
          error: () => {
            console.log("Error al cargar las Descuento")
          }
        })
      )
    } else {
      this.subscription.add(
        this.offerService.get().subscribe({
          next: (offer: OfferDtoProducto[]) => {
            this.lista = []
            offer.forEach(o => {
              if (o.activo == false) {
                this.lista.push(o)
              }
            })
          },
          error: () => {
            console.log("Error al cargar las Descuento")
          }
        })
      )
    }
  }
}
