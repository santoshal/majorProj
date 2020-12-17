import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  names:string[]=['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartLabels: Label[] = this.names;
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' }
 
  ];
  constructor() {


    
   }

  ngOnInit(): void {
  }

}
