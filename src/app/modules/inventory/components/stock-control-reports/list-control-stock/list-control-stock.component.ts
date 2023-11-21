import {Component, OnInit} from '@angular/core';
import {StockControlReportService} from "../../../services/stock-control-report.service";
import {StockControlReport} from "../../../models/StockControlReport";

@Component({
    selector: 'fn-list-control-stock',
    templateUrl: './list-control-stock.component.html',
    styleUrls: ['./list-control-stock.component.css']
})
export class ListControlStockComponent implements OnInit {

    constructor(private reportService: StockControlReportService) {
    }

    listaControl: StockControlReport[] = [];

    ngOnInit(): void {
        this.reportService.get().subscribe(lista => this.listaControl = lista);
    }
}
