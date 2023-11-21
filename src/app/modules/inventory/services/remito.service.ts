import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Receipt } from '../models/receipt';

@Injectable({
  providedIn: 'root'
})

export class ReceiptService {
  
  private _selectedReceipt: Receipt = new Receipt();

  constructor(private http: HttpClient) { }

  getReceipts(): Observable<Receipt[]> {
    return this.http.get<Receipt[]>("http://localhost:3000/receipts");
  }
  
    create(body: Receipt): Observable<Receipt>{
    return this.http.post<Receipt>('http://localhost:3000/receipts', body);
  }

  set selectedReceipt(receipt : Receipt){
    this._selectedReceipt=receipt;
  }

  get selectedReceipt(){
    return this._selectedReceipt;
  }

}
