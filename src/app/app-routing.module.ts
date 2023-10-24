import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CatalogModule } from './modules/catalog/catalog.module';
import { CustomerModule } from './modules/customer/customer.module';
import { PurchaseModule } from './modules/purchase/purchase.module';
import { InventaryModule } from './modules/inventory/inventory.module';
import { SalesModule } from './modules/sales/sales.module';
import { InvoiceModule } from './modules/invoice/invoice.module';

import * as Catalog from './modules/catalog/components/home/home.component';
import * as Customer from './modules/customer/components/home/home.component';
import * as Purchase from './modules/purchase/components/home/home.component';
import * as Invoice from './modules/invoice/components/home/home.component';
import * as Inventory from './modules/inventory/components/home/home.component';
import * as Sales from './modules/sales/components/home/home.component';

const routes: Routes = [
  {
    path: 'catalog',
    component: Catalog.HomeComponent,
  },
  {
    path: 'customer',
    component: Customer.HomeComponent,
  },
  {
    path: 'purchase',
    component: Purchase.HomeComponent,
  },
  {
    path: 'invoice',
    component: Invoice.HomeComponent,
  },
  {
    path: 'inventory',
    component: Inventory.HomeComponent,
  },
  {
    path: 'sales',
    component: Sales.HomeComponent,
  },
];

@NgModule({
  imports: [
    CatalogModule,
    CustomerModule,
    PurchaseModule,
    InventaryModule,
    SalesModule,
    InvoiceModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
