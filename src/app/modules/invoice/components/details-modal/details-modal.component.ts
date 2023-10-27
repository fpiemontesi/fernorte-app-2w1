import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Detail } from '../../models/Detail';

@Component({
  selector: 'fn-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.css']
})
export class DetailsModalComponent {
  @Input() selectedDetails: Detail[] = []; 
  @Output () onClose = new EventEmitter();

  closeModal(){
    this.onClose.emit();
  }
}
