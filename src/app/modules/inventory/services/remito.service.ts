import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Receipt } from '../models/receipt';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {
  url: string = "http://localhost:3000/receipts";
  private _selectedReceipt: Receipt = new Receipt();

  constructor(private http: HttpClient) { }

  get selectedReceipt(): Receipt {
    return this._selectedReceipt;
  }

  set selectedReceipt(value: Receipt) {
    this._selectedReceipt = value;
  }

  getReceipts(): Observable<Receipt[]> {
    const result = this.http.get<Receipt[]>(
      this.url
    );
    return result;
  }

}
