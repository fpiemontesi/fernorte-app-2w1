import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {Producto} from "../../../../models/producto";
import {productService} from "../../../../services/productService/product.service";
import {CatalogService} from "../../../../services/catalogService/catalog.service";
import {Catalog} from "../../../../models/catalog";

@Component({
  selector: 'fn-register-catalog',
  templateUrl: './register-catalog.component.html',
  styleUrls: ['./register-catalog.component.css']
})
export class RegisterCatalogComponent implements OnInit,OnDestroy{

  private subscription:Subscription = new Subscription();
  formCatalog:FormGroup = new FormGroup({});
  product: FormControl = new FormControl('', [Validators.required]);
  indexProductos: number | null = null;
  hayProductos: boolean = false;
  allProducts:Producto[]=[];
  productosSeleccionados:Producto[]=[];
  catalog:Catalog = {} as Catalog;
  alert: boolean = false;
  constructor(private formBuilder:FormBuilder, private productService:productService, private catalogService:CatalogService) {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {

    this.formCatalog = this.formBuilder.group({
      name:["",[Validators.required]],
      description:["",[Validators.required]]
    })


    this.getAllProducts();
  }

  getAllProducts(){
    this.subscription.add(
      this.productService.getAllProducts().subscribe(
        (response:Producto[])=>{
          this.allProducts=response;
        }
      )
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

  deleteProduct(index: number) {
    const prod:Producto = this.productosSeleccionados.at(index) as Producto;
    this.productosSeleccionados.splice(index,1);
    this.allProducts.push(prod);
  }
  addProduct() {
    const selectedProductCode = this.product.value;
    const selectedProduct = this.allProducts.find(product => product.codigo === selectedProductCode);

    if (selectedProduct) {
      this.productosSeleccionados.push(selectedProduct);
      this.allProducts = this.allProducts.filter(producto => producto.codigo !== selectedProduct.codigo);
      this.indexProductos = this.productosSeleccionados.length - 1;
      this.hayProductos = true;
      this.product.reset();
    }
  }

  saveCatalog() {
    const codigos:string[]=[]
    this.productosSeleccionados.forEach(p=>{
      codigos.push(p.codigo)
    })
    this.catalog = {
      nombre:this.formCatalog.get('name')?.value,
      descripcion:this.formCatalog.get('description')?.value,
      productos_asociados:codigos
    } as Catalog

    this.subscription.add(
      this.catalogService.postCatalog(this.catalog).subscribe({
        next: async () => {
          await this.toggleAlert()
          this.catalog = {} as Catalog
          //this.router.navigate(["listCategories"])

        },
        error: () => {
          alert("Error al intentar crear el catalogo.")
        }
      })
    )
  }

}
