import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {HistExchange} from '../../../model/histExchange/histExchange';
import {NotificationsService} from 'angular2-notifications';
import {Ser} from '../../../model/data/ser';
import {DataService} from '../../../shared/services/apiData/data.service';
import {HistRate} from '../../../model/histrate/histRate';
import {Data} from '@angular/router';
import {Exchange} from '../../../model/exchange/exchange';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  options: string[];
  exchange: Exchange;
  multi: any[] = [];
  histExchange: HistExchange;
  series: Ser[] = [];
  model;
  view: any[] = [700, 300];
  animations = true;
  xAxis = true;
  yAxis = true;
  showYAxisLabel = true;
  showXAxisLabel = true;
  xAxisLabel = 'TIMELINE';
  yAxisLabel = 'EXCHANGE';
  // timeline = true;

  colorScheme = {
    domain: ['#ff0000']
  };

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.getKeysFromApi();
  }

  onAddTimeline(fromInput: HTMLInputElement, toInput: HTMLInputElement): void {
    const bInput = 'USD';
    const rInput = 'PLN';
    const timeline$ = this.dataService.getDataFromTo(bInput, rInput, fromInput.value, toInput.value);
    timeline$.subscribe((data: HistExchange) => {
      this.histExchange = data;
      const dates = Object.keys(this.histExchange.rates);
      const rates = Object.values(this.histExchange.rates);
      for (let i = 0; i < dates.length; i++) {
        this.series.push({name: dates[i], value: rates[i][rInput]});
      }
    });
    this.multi.push({name: bInput, series: this.series});
    // this.chart.nativeElement.getAttribute('[result]').value = this.multi;
    console.log(this.multi);
    // this.chart.update();
  }
  getKeysFromApi(): void {
    this.dataService.getAllData().subscribe((data: Exchange) => {
      this.exchange = data;
      this.options = Object.keys(this.exchange.rates);
      this.options.push('EUR');
      this.options.sort();
    });
  }
}
