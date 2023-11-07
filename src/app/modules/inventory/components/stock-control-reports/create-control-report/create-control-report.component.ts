import {Component, OnInit} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {BatchFinderModalComponent} from "../batch-finder-modal/batch-finder-modal.component";
import {Batch} from "../../../models/batch";
import {StockControlReport} from "../../../models/StockControlReport";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BatchService} from "../../../services/batch.service";
import {ToastService} from "../../../services/toast.service";
import {StockControlReportService} from "../../../services/stock-control-report.service";

@Component({
  selector: 'fn-create-control-report',
  templateUrl: './create-control-report.component.html',
  styleUrls: ['./create-control-report.component.css']
})
export class CreateControlReportComponent implements OnInit {
  batch: Batch | null = null;
  formGroup: FormGroup = this.fb.group({});

  constructor(private modalService: NgbModal, private fb: FormBuilder, private batchService: BatchService,
              private toastService: ToastService, private reportService: StockControlReportService) {
    this.formGroup = this.fb.group({
      batch: ["", [Validators.required, Validators.min(1)]],
      date: ["", Validators.required],
      inspectedQuantity: ["", [Validators.required, Validators.min(0.1)]],
      damagedQuantity: [{value: 0, disabled: false}, [Validators.min(0), Validators.required]],
      expired: [false],
      description: ["", [Validators.minLength(20), Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  openModal(): void {
    const modalRef: NgbModalRef = this.modalService.open(BatchFinderModalComponent);
    modalRef.componentInstance.onBatchSelected.subscribe((batch: Batch) => {
      this.batch = batch;
      this.formGroup.controls['batch'].setValue(this.batch.id);
    })
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      for (const field in this.formGroup.controls) {
        const control = this.formGroup.get(field);
        control?.markAllAsTouched();
      }
      return;
    }

    if (this.batch == null) {
      let batchExists: boolean = true;
      (this.batchService.getById(this.formGroup.controls['batch'].value).subscribe({
        next: value => {
          this.batch = value;
        },
        error: err => {
          if (err.status == 404) {
            this.toastService.show("No existe un lote con id " + this.formGroup.controls['batch'].value,
              {classname: 'bg-danger text-light'});
            batchExists = false;
          } else {
            console.log(err);
          }
        }
      }))
      if (!batchExists) {
        return;
      }
    }
    const newReport: StockControlReport = new StockControlReport();
    newReport.batchId = this.formGroup.controls["batch"].value;
    newReport.date = this.formGroup.controls["date"].value;
    newReport.description = this.formGroup.controls["description"].value;
    newReport.damagedQuantity = this.formGroup.controls["damagedQuantity"].value;
    newReport.batchIsExpired = this.formGroup.controls["expired"].value;
    newReport.inspectedQuantity = this.formGroup.controls["inspectedQuantity"].value;

    this.reportService.create(newReport).subscribe({
      next: value => {
        this.toastService.show("Control registrado correctamente",
          {classname: 'bg-success text-light'});
        this.formGroup.reset();
        this.batch = null;
      },
      error: err => {
        this.toastService.show("Hubo un error: " + err,
          {classname: 'bg-danger text-light'});
      }
    });

  }
}
