import { Component, OnInit } from '@angular/core';
import { StadisticByExistance } from '../../models/stadistic-by-existance';
import { StadisticsService } from '../../services/stadistics.service';
import { Stadistic } from '../../models/stadistic';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-stadistics-damaged-existances',
  templateUrl: './stadistics-damaged-existances.component.html',
  styleUrls: ['./stadistics-damaged-existances.component.css']
})
export class StadisticsDamagedExistancesComponent implements OnInit {


  seasonStart:Date = new Date;
  seasonEnd:Date = new Date;
  stadistics?:StadisticByExistance[];
  
 private subscriptions = new Subscription();
  constructor(private service : StadisticsService) { }

  ngOnInit() {

    this.subscriptions.add(this.service.getDamaged().subscribe({
      next: (response: Stadistic) => {
        this.seasonStart=new Date(response.seasonStart);
        this.seasonEnd=new Date(response.seasonEnd);
        this.stadistics = response.items;
      },
      error: (err) => {
        console.log(err);
      }
    })
  );
  }
}
