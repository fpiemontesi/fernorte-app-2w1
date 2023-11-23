import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CustomerModule } from './modules/customer/customer.module';
import { PurchaseModule } from './modules/purchase/purchase.module';
import { SalesModule } from './modules/sales/sales.module';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { CatalogModule } from './modules/catalog/catalog.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InventaryModule } from './modules/inventory/inventory.module';
import { ExistenciasService } from './modules/inventory/services/existance.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,

    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    AppRoutingModule,
    CatalogModule,
    CustomerModule,
    PurchaseModule,
    InventaryModule,
    SalesModule,
    InvoiceModule
  ],
  providers: [ExistenciasService],
  bootstrap: [AppComponent],
})
export class AppModule {}
