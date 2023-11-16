import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastService } from '../../../services/toast.service';
import { ReportesService } from '../../../services/reportes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'fn-reporte-home',
  templateUrl: './reporte-home.component.html',
  styleUrls: ['./reporte-home.component.css']
})
export class ReporteHomeComponent {
  filterForm: FormGroup = new FormGroup({});
  dataLoaded: Boolean = false;
  chartInstance: any;

  constructor( private formBuilder: FormBuilder, private toastService: ToastService, private reportService: ReportesService,private route: Router) {
    this.filterForm = this.formBuilder.group({
      dateFrom: [''],
      dateTo: [''],
      client: [''],
    });
  }

  search(){
    this.reportService.setFilters(this.filterForm.value.dateFrom, this.filterForm.value.dateTo);
  }
  
  verDetallesReportClientes(){
    console.log('verDetallesReportClientes');
    this.route.navigate(['Reportes/Clientes']);
  }
}
