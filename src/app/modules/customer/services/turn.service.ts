import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TurnService {

  constructor() { }

  private turneroSubject = new BehaviorSubject<any[]>([]);
  turnos$: Observable<any[]> = this.turneroSubject.asObservable();

  getTurno(): any[] {
    return this.turneroSubject.value;
  }

  agregarTurno(turno: any) {
    const turnos = this.turneroSubject.value;
    if (!Array.isArray(turnos)) {
      this.turneroSubject.next([turno]);
    } else {
      turnos.push(turno);
      this.turneroSubject.next(turnos);
    }
  }
}
