import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Zone} from "../../../models/storage-zone";
import {Section} from "../../../models/section";
import {Batch} from "../../../models/batch";
import {Subscription} from "rxjs";
import {StorageZoneService} from "../../../services/storage-zone.service";
import {SectionService} from "../../../services/section.service";
import {BatchService} from "../../../services/batch.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastService} from "../../../services/toast.service";

@Component({
  selector: 'fn-batch-finder-modal',
  templateUrl: './batch-finder-modal.component.html',
  styleUrls: ['./batch-finder-modal.component.css']
})

export class BatchFinderModalComponent implements OnInit, OnDestroy {
  finderForm: FormGroup = this.fb.group({});
  zoneIsSelected: boolean = false;
  zones: Zone[] = [];
  sections: Section[] = [];
  batches: Batch[] = [];
  @Output() onBatchSelected = new EventEmitter<Batch>;
  private subscriptions = new Subscription();

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder,
              private storageZoneService: StorageZoneService, private toastService: ToastService,
              private sectionService: SectionService, private batchService: BatchService) {

  }

  ngOnInit(): void {
    this.finderForm = this.fb.group({
      zones: ["", Validators.required],
      sections: [{value: "", disable: true}, Validators.required]
    });

    this.subscriptions.add(
      this.storageZoneService.getAll().subscribe({
        next: (response: Zone[]) => {
          this.zones = response;
        },
        error: err => {
          this.toastService.show("Hubo un error: " + err.message +
            {classname: 'bg-danger text-light'});
        }
      })
    );

    this.subscriptions.add(
      this.finderForm.controls['zones'].valueChanges.subscribe(
        value => {
          this.subscriptions.add(this.sectionService.getByZone(value).subscribe(
              {
                next: (response: Section[]) => {
                  this.sections = response;
                },
                error: err => {
                  this.toastService.show("Hubo un error: " + err.message,
                    {classname: 'bg-danger text-light'});
                }
              }
            )
          );
          this.finderForm.controls['sections'].enable();
        }
      )
    );

    this.subscriptions.add(
      this.finderForm.controls['sections'].valueChanges.subscribe(
        value => {
          this.subscriptions.add(
            this.batchService.getAllBySection(value).subscribe(
              {
                next: (response: Batch[]) => {
                  this.batches = response;
                },
                error: err => {
                  this.toastService.show("Hubo un error: " + err.message,
                    {classname: 'bg-danger text-light'});
                }
              }
            )
          );
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  batchSelected(batchIndex: number) {
    this.activeModal.dismiss();
    this.onBatchSelected.emit(this.batches[batchIndex]);
  }
}
