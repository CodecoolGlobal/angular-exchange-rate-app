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
  multi = [];
  // multi = [{name: 'AUD', series: [{name: '1990', value: 62000000}, {name: '2010', value: 73000000}, {name: '2011', value: 789400000}]}];
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
  timeline = true;

  colorScheme = {
    domain: ['#ff0000']
  };

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.getKeysFromApi();
  }

  onAddTimeline(fromCurrency: HTMLSelectElement,
                toCurrency: HTMLSelectElement,
                fromDate: HTMLInputElement,
                toDate: HTMLInputElement): void {
    const timeline$ = this.dataService.getDataFromTo(fromCurrency.value, toCurrency.value, fromDate.value, toDate.value);
    timeline$.subscribe((data: HistExchange) => {
      this.histExchange = data;
      const dates = Object.keys(this.histExchange.rates);
      const rates = Object.values(this.histExchange.rates);
      for (let i = 0; i < dates.length; i++) {
        this.series.push({name: dates[i], value: rates[i][toCurrency.value]});
      }
      this.series.sort((val1, val2) => {// @ts-ignore
        return new Date(val1.name) - new Date(val2.name); });
    });
    // this.series.sort((a, b) => (new Date(a.name) - new Date(b.name));
    this.multi.push({name: fromCurrency.value, series: this.series});
    console.log(this.multi);
    // this.chart.nativeElement.getAttribute('[result]').value = this.multi;
    // this.multi.sort((a, b) => {
    //   return new Date((a.series.name) as any - (new Date(b.series.name) as any));
    // });

    // this.chart.update();
  }

  // get sortData(): Ser[]{
  //   return this.series.sort((a, b) => {
  //     // tslint:disable-next-line:radix
  //     return (parseInt(b.name.replace(/-/g, ''))) - (parseInt(a.name.replace(/-/g, '')));
  //   });
  // }

  getKeysFromApi(): void {
    this.dataService.getAllData().subscribe((data: Exchange) => {
      this.exchange = data;
      this.options = Object.keys(this.exchange.rates);
      this.options.push('EUR');
      this.options.sort();
    });
  }
}
