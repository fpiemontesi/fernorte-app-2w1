import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { ReceiptListComponent } from './components/receipts/lista-remitos/lista-remitos.component';
import { ReceiptDetailsModalComponent } from
    "./components/receipts/receipt-details-modal/receipt-details-modal.component";
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [HomeComponent, ReceiptListComponent, ReceiptDetailsModalComponent],
  providers: [],
  imports: [CommonModule,
            FormsModule],
  exports: [HomeComponent],
})
export class InventaryModule {}
