import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {Producto} from "../../../models/producto";
import {productService} from "../../../services/productService/product.service";
import {CatalogService} from "../../../services/catalogService/catalog.service";
import {Catalog} from "../../../models/catalog";
import {ActivatedRoute, Router} from "@angular/router";
import {CatalogDTO} from "../../dtos/catalog-dto";

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
  catalog:Catalog = {codigo:"",nombre:"",descripcion:"",productos_asociados:[]} as Catalog;
  codigo:string="";
  alert: boolean = false;
  title:string="";
  tipo:number = 1; // TIPO 1: REGISTRAR - TIPO 2: MODIFICAR - TIPO 3: CONSULTA

  constructor(private formBuilder:FormBuilder, private productService:productService, private catalogService:CatalogService, private activatedRoute:ActivatedRoute, private router:Router) {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.formCatalog = this.formBuilder.group({
      codigo: [""],
      name: ["", [Validators.required]],
      description: ["", [Validators.required]]
    });

    this.subscription.add(
      this.activatedRoute.queryParams.subscribe((params) => {
        this.title = params["title"];
        this.tipo = params["tipo"];
        if (params["codigo"] != null) {
          this.codigo = params["codigo"];
        }
      })
    );

    if (this.codigo != "") {
      this.subscription.add(
        this.catalogService.getCatalogByCode(this.codigo).subscribe({
          next: (response: CatalogDTO) => {
            this.catalog.nombre = response.nombre;
            this.catalog.codigo = response.codigo;
            this.catalog.descripcion = response.descripcion;
            response.productos_asociados.forEach((p: Producto) => {
              this.productosSeleccionados.push(p);
            });
            this.formCatalog.setValue({
              codigo: this.catalog.codigo,
              name: this.catalog.nombre,
              description: this.catalog.descripcion
            });
          },
          error: () => {
            alert("Error al intentar cargar el catálogo.");
          }
        })
      );
    }

    this.getAllProducts();

    if (this.tipo != 1) {
      if (this.tipo == 2) {
        this.formCatalog.get("codigo")?.disable();
      } else {
        this.formCatalog.get("codigo")?.disable();
        this.formCatalog.get("name")?.disable();
        this.formCatalog.get("description")?.disable();
        this.formCatalog.get("product")?.disable();
      }

      this.subscription.add(
        this.productService.getAllProducts().subscribe((response: Producto[]) => {
          this.allProducts = response.filter(
            (producto) =>
              !this.productosSeleccionados.some((selected) => selected.codigo === producto.codigo)
          );
        })
      );
    }
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

    if(this.tipo == 1){
      this.subscription.add(
        this.catalogService.postCatalog(this.catalog).subscribe({
          next: async () => {
            await this.toggleAlert()
            this.catalog = {} as Catalog
            this.productosSeleccionados = [];
            this.formCatalog.reset();
            alert("Catalogo guardado exitosamente!")
            this.router.navigate(["listCatalogs"])

          },
          error: () => {
            alert("Error al intentar crear el catalogo.")
          }
        })
      )
    }
    if(this.tipo == 2){
      this.subscription.add(
        this.catalogService.updateCatalog(this.codigo,this.catalog).subscribe({
          next: async () => {
            await this.toggleAlert()
            this.catalog = {} as Catalog
            this.productosSeleccionados = [];
            this.formCatalog.reset();
            alert("Catalogo actualizado exitosamente!")
            this.router.navigate(["listCatalogs"])

          },
          error: () => {
            alert("Error al intentar actualizar el catalogo.")
          }
        })
      )
    }
  }

}
