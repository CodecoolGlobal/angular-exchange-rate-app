import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DataService} from '../../../services/data.service';
import {Exchange} from '../../../model/exchange/exchange';
import {NotificationsService} from 'angular2-notifications';
import {Subject} from 'rxjs';
import {HistExchange} from '../../../model/histExchange/histExchange';
import {HistRate} from '../../../model/histrate/histRate';
import {Data} from './data';
import {Ser} from '../../../model/data/ser';

@Component({
  selector: 'app-input-forms',
  templateUrl: './input-forms.component.html',
  styleUrls: ['./input-forms.component.css']
})
export class InputFormsComponent implements OnInit {

  options: string[];
  exchange: Exchange;
  histExchange: HistExchange;
  histRates: HistRate[] = [];
  series: Ser[] = [];
  data: Data[] = [];
  model;
  @Output() currencyCreated = new EventEmitter<{ base: string, result: string, img: string }>();
  @Output() currencyRemoved = new EventEmitter<{ base: string, result: string }>();

  multi: any[];
  view: any[] = [700, 300];

  // options
  legend = true;
  animations = true;
  xAxis = true;
  yAxis = true;
  showYAxisLabel = true;
  showXAxisLabel = true;
  xAxisLabel = 'DATE';
  yAxisLabel = 'VALUE';
  timeline = true;

  colorScheme = {
    domain: ['#5AA454']
  };

  constructor(private notificationsService: NotificationsService, private dataService: DataService) {
  }

  ngOnInit(): void {
    this.getCurrencyKeys();
  }

  onAddCurrency(baseInput: HTMLSelectElement, resultInput: HTMLSelectElement, imgInput: HTMLInputElement): void {
    const sub = new Subject<string>();
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    if (baseInput.value === resultInput.value) {
      this.showErrorNotifications('INPUTS CANNOT HAVE THE SAME VALUE!');
    } else if (!pattern.test(imgInput.value)) {
      this.showErrorNotifications('INVALID URL!');
    } else {
      this.currencyCreated.emit({base: baseInput.value, result: resultInput.value, img: imgInput.value});
    }
  }

  showErrorNotifications(message): void {
    this.notificationsService.error('ERROR', message, {
      position: ['bottom', 'left'],
      timeOut: 2000,
      animate: 'fade',
      showProgressBar: true
    });
  }

  onRemoveCurrency(baseInput: HTMLSelectElement, resultInput: HTMLSelectElement): void {
    if (baseInput.value === resultInput.value) {
      this.showErrorNotifications('INPUTS CANNOT HAVE THE SAME VALUE!');
    } else {
      this.currencyRemoved.emit({base: baseInput.value, result: resultInput.value});
    }
  }

  getCurrencyKeys(): void {
    this.dataService.getAllData().subscribe((data: Exchange) => {
      this.exchange = data;
      this.options = Object.keys(this.exchange.rates);
      this.options.push('EUR');
      this.options.sort();
      console.log(this.options);
    });
  }

  onAddTimeline(baseInput: HTMLSelectElement, resultInput: HTMLSelectElement, fromInput: HTMLInputElement, toInput: HTMLInputElement): void {
    const timeline$ = this.dataService.getDataFromTo(baseInput.value, resultInput.value, fromInput.value, toInput.value);
    timeline$.subscribe((data: HistExchange) => {
      this.histExchange = data;
      const dates = Object.keys(this.histExchange.rates);
      const rates = Object.values(this.histExchange.rates);
      for (let i = 0; i < dates.length; i++) {
        this.series.push({name: dates[i], value: rates[i][resultInput.value]});
      }
    });
    this.data.push({name: baseInput.value, series: this.series});
    console.log(this.data);
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
