import { Component } from '@angular/core';
import { Offer } from '../../../models/offer';
import { Producto } from '../../../models/producto';
import { Subscription } from 'rxjs';
import { OfferService } from '../../../services/offerService/offer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { productService } from '../../../services/productService/product.service';
import { OfferDtoProducto } from '../../dtos/offer-dto-producto';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'fn-update-offer',
  templateUrl: './update-offer.component.html',
  styleUrls: ['./update-offer.component.css']
})
export class UpdateOfferComponent {

  offer: Offer = {} as Offer;
  lstProductos: Producto[] = []
  codeOfferSelected: string = "";
  alert: boolean = false
  private subscription = new Subscription();

  constructor(private offerService: OfferService, private activatedRoute: ActivatedRoute, private route: Router, private pService: productService) {
  }

  ngOnInit(): void {
    this.subscription.add(
      this.activatedRoute.queryParams.subscribe(params => {
        this.codeOfferSelected = params["codigo"];
      }),
    )
    this.subscription.add(
      this.offerService.getByCode(this.codeOfferSelected).subscribe(
        (response: OfferDtoProducto) => {
          this.offer = {
            nombre: response.nombre,
            codigo: response.codigo,
            descripcion: response.descripcion,
            puntos: response.puntos,
            activo: response.activo,
            codigo_producto: response.producto.codigo,
            precio_oferta: response.precio_oferta
          };
        }),
    )
    this.subscription.add(
      this.pService.getAllProducts().subscribe({
        next: (data: Producto[]) => {
          data.forEach(e => {
            if (e.activo == true) {
              this.lstProductos.push(e)
            }
          })
        },
        error: () => {
          alert("error")
        }
      }),
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  enviarForm(formulario: NgForm) {
    if (formulario.valid) {
      this.editarOffer()
    }
  }

  editarOffer() {
    this.subscription.add(
      this.offerService.update(this.offer).subscribe({
        next: async (offer: Offer) => {
          await this.toggleAlert()
          this.offer = {} as Offer
          this.route.navigate(["/listOffers"])
        },
        error: () => {
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
        }, 1000);
      });
    } else {
      return Promise.resolve();
    }
  }
}
