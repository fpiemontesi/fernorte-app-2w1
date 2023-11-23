import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'fn-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Output() evento = new EventEmitter()
  @Input() title: string = ""
  @Input() mensaje: string = ""
  @Input() option1: string = ""
  @Input() option2: string = ""

  onEvent() {
    this.evento.emit()
  }
}
