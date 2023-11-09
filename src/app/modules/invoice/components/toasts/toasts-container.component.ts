import { Component, TemplateRef } from '@angular/core';

import { ToastService } from '../../services/toast.service';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-toasts',
	standalone: true,
	imports: [NgbToastModule, NgIf, NgTemplateOutlet, NgFor],
	template: `
		<ngb-toast
			*ngFor="let toast of toastService.toasts"
			[class]="toast.classname"
			[autohide]="true"
			[delay]="toast.delay || 5000"
			(hidden)="toastService.remove(toast)"
		>
			<ng-template [ngIf]="isTemplate(toast)" [ngIfElse]="text">
				<ng-template [ngTemplateOutlet]="toast.textOrTpl"></ng-template>
			</ng-template>

			<ng-template #text>{{ toast.textOrTpl }}</ng-template>
		</ngb-toast>
	`,
	host: { class: 'toast-container centered-toast', style: 'z-index: 1200' } ,
})
export class ToastsContainer {
	constructor(public toastService: ToastService) {}

	isTemplate(toast: { textOrTpl: any; }) {
		return toast.textOrTpl instanceof TemplateRef;
	}
}