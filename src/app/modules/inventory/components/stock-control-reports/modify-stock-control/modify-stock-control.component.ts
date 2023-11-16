import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StockControlReport} from '../../../models/StockControlReport';
import {Subscription} from 'rxjs';
import {StockControlReportService} from '../../../services/stock-control-report.service';
import {ToastService} from "../../../services/toast.service";

@Component({
  selector: 'fn-modify-stock-control',
  templateUrl: './modify-stock-control.component.html',
  styleUrls: ['./modify-stock-control.component.css']
})
export class ModifyStockControlComponent implements OnInit, OnDestroy {

  stockControlForm: FormGroup = new FormGroup({});
  stockControl: StockControlReport = new StockControlReport();
  private subscription: Subscription = new Subscription();

  constructor(private formBuilder: FormBuilder, private stockControlService: StockControlReportService,
              private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.stockControlForm = this.formBuilder.group({
      batchId: [null, Validators.required],
      description: ['', Validators.required],
      inspectedQuantity: [null, Validators.required],
      damagedQuantity: [null, Validators.required],
      batchIsExpired: false
    });

    this.subscription = this.stockControlService.getById(1).subscribe((data: StockControlReport) => {
      this.stockControl = data || new StockControlReport();
      this.loadStockControlData();
    })
  }

  loadStockControlData() {
    this.stockControlForm.patchValue({
      batchId: this.stockControl.batchId,
      description: this.stockControl.description,
      inspectedQuantity: this.stockControl.inspectedQuantity,
      damagedQuantity: this.stockControl.damagedQuantity,
      batchIsExpired: this.stockControl.batchIsExpired
    });
  }

  updateStockControl() {
    if (this.stockControlForm.valid) {
      this.stockControl.batchId = this.stockControlForm.get('batchId')?.value;
      this.stockControl.description = this.stockControlForm.get('description')?.value;
      this.stockControl.inspectedQuantity = this.stockControlForm.get('inspectedQuantity')?.value;
      this.stockControl.damagedQuantity = this.stockControlForm.get('damagedQuantity')?.value;
      this.stockControl.batchIsExpired = this.stockControlForm.get('batchIsExpired')?.value;

      this.subscription.add(
        this.stockControlService.modify(this.stockControl).subscribe((updatedControl: StockControlReport) => {
          this.toastService.show("Formulario valido", {classname: 'bg-success text-light'});
        })
      );
    } else {
      this.toastService.show("Formulario invalido", {classname: 'bg-danger text-light'});
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


}
