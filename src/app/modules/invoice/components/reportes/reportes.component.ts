import { Component } from '@angular/core';
import { ReportesService } from '../../services/reportes.service';
import { ClientReportDTO } from '../../models/client-report-dto';

@Component({
  selector: 'fn-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent {

  cliente:ClientReportDTO[] = []


  constructor(private reporteService:ReportesService){
    reporteService.obtenerMontoTotalPorCliente().subscribe( (response: ClientReportDTO[]) => {
      console.log(response)
    })
   
  }

}
