import { Component, OnInit } from '@angular/core';
import { StadisticsService } from '../../services/stadistics.service';
import { Subscription } from 'rxjs';
import { Stadistic } from '../../models/stadistic';
import { StadisticByExistance } from '../../models/stadistic-by-existance';

@Component({
  selector: 'app-stadistics-expired-existances',
  templateUrl: './stadistics-expired-existances.component.html',
  styleUrls: ['./stadistics-expired-existances.component.css']
})
export class StadisticsExpiredExistancesComponent implements OnInit {

  seasonStart:Date = new Date;
  seasonEnd:Date = new Date;
  stadistics?:StadisticByExistance[];
  
 private subscriptions = new Subscription();
  constructor(private service : StadisticsService) { }

  ngOnInit() {

    this.subscriptions.add(this.service.getExpired().subscribe({
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
