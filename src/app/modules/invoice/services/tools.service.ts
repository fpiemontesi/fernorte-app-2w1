import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

constructor() { }

public formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
}
