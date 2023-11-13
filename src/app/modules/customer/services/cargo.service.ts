import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  constructor() { }
  private cargoSubject = new BehaviorSubject<any[]>([]);
  cargos$: Observable<any[]> = this.cargoSubject.asObservable();

  getCargo(): any[] {
    return this.cargoSubject.value;
  }

  agregarCargo(cargo: any) {
    let cargos = this.cargoSubject.value;
    cargos.push(cargo);
    this.cargoSubject.next(cargo);
  }
}
