import { Component } from '@angular/core';
import { AppToastService } from '../../services/app-toast.service';

@Component({
  selector: 'fn-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.css']
})
export class ToastsComponent {
  constructor(public toastService: AppToastService) {}
}
