import { Component } from '@angular/core';
import {Subscription} from "rxjs";
import {CatalogService} from "../../../services/catalogService/catalog.service";
import {Catalog} from "../../../models/catalog";

@Component({
  selector: 'fn-list-catalog',
  templateUrl: './list-catalog.component.html',
  styleUrls: ['./list-catalog.component.css']
})
export class ListCatalogComponent {
  lista: Catalog[] = [];
  private subscription = new Subscription();
  alert: boolean = false;
  codeCatalog = "";
  protected readonly encodeURIComponent = encodeURIComponent;

    constructor(private catalogService: CatalogService) {
  }

  ngOnInit(): void {
    this.loadCatalogs()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  eliminarCatalogo() {
    this.subscription.add(
        this.catalogService.deleteCatalog(this.codeCatalog).subscribe({
          next: async (catalog: Catalog) => {
            await this.toggleAlert();
            this.loadCatalogs()
          },
          error: () => {
            alert("Error al intentar eliminar el catalogo.")
          }
        })
    )
  }

  private loadCatalogs() {
    this.subscription.add(
        this.catalogService.getAllCatalogs().subscribe({
          next: (catalogs: Catalog[]) => {
            this.lista = catalogs
          },
          error: () => {
            console.log("Error al intentar cargar catalogos.")
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
        }, 3000);
      });
    } else {
      return Promise.resolve();
    }
  }

  guardarCodigo(codigo:string){
    this.codeCatalog = codigo;
  }

}
