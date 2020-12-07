import {Component, OnInit, ViewChild} from '@angular/core';
import {HistExchange} from '../../../model/histExchange/histExchange';
import {Ser} from '../../../model/data/ser';
import {DataService} from '../../../shared/services/apiData/data.service';
import {Exchange} from '../../../model/exchange/exchange';
import {CurrenciesComponent} from '../../../shared/components/currencies/currencies.component';
import {DateComponent} from '../../../shared/components/date/date.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent {
  chartsQuery: Subscription;
  @ViewChild('fromToContent') fromToContent: CurrenciesComponent;
  @ViewChild('fromDate') fromDate: DateComponent;
  @ViewChild('toDate') toDate: DateComponent;
  base = 'CURRENCY';
  result = 'CURRENCY';
  exchange: Exchange;
  multi = [];
  histExchange: HistExchange;
  series: Ser[] = [];
  view: any[] = [560, 240];
  animations = true;
  xAxis = true;
  yAxis = true;
  showYAxisLabel = true;
  showXAxisLabel = true;
  timeline = false;
  yScaleMin: number;
  values: number[] = [];

  colorScheme = {
    domain: ['#630000']
  };

  constructor(private dataService: DataService) {
  }

  onAddTimeline(): void {
    const inputs = this.fromToContent.currenciesForm.value;
    const base = inputs.selectedFrom;
    const result = inputs.selectedTo;
    this.base = base;
    this.result = result;
    const timeline$ = this.dataService.getDataFromTo(base, result,
      this.fromDate.selectDate.nativeElement.value,
      this.toDate.selectDate.nativeElement.value);
    this.chartsQuery = timeline$.subscribe((data: HistExchange) => {
      this.histExchange = data;
      const dates = Object.keys(this.histExchange.rates);
      const rates = Object.values(this.histExchange.rates);
      for (let i = 0; i < dates.length; i++) {
        this.series.push({name: dates[i], value: rates[i][result]});
        this.values.push(rates[i][result]);
      }
      this.yScaleMin = Math.min(...this.values);
      this.series.sort((val1, val2) => {// @ts-ignore
        return new Date(val1.name) - new Date(val2.name);
      });
    });
    this.multi = [{name: base, series: this.series}];
    this.series = [];
    this.yScaleMin = 0;
    console.log(this.multi);
  }
}
