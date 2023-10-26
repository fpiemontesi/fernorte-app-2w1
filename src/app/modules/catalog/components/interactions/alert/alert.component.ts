import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'fn-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit{
  showAlert:boolean= true;
  @Input() mensaje = "";
  @Input() tipoAlert = "";

  ngOnInit(): void {
    setTimeout(() => {
      this.showAlert = false;
    }, 5000);
  }

}
