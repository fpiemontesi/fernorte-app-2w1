import { Component } from '@angular/core';

@Component({
  selector: 'fn-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private readonly modules = {
    CATALOG: 'CATALOG',
    CLIENTS: 'CLIENTS',
    INVENTORY: 'INVENTORY',
    PURCHASE: 'PURCHASE',
    SALES: 'SALES',
  };

  showCatalog: boolean = false;
  showClients: boolean = false;
  showInventory: boolean = false;
  showPurchase: boolean = false;
  showSales: boolean = false;

  onShowCatalog() {
    this.onShowModule(this.modules.CATALOG);
  }

  onShowClients() {
    this.onShowModule(this.modules.CLIENTS);
  }

  onShowInventory() {
    this.onShowModule(this.modules.INVENTORY);
  }

  onShowPurchase() {
    this.onShowModule(this.modules.PURCHASE);
  }

  onShowSales() {
    this.onShowModule(this.modules.SALES);
  }

  private onShowModule(moduleName: string) {
    this.showCatalog = moduleName === this.modules.CATALOG;
    this.showClients = moduleName === this.modules.CLIENTS;
    this.showInventory = moduleName === this.modules.INVENTORY;
    this.showPurchase = moduleName === this.modules.PURCHASE;
    this.showSales = moduleName === this.modules.SALES;
  }
}
