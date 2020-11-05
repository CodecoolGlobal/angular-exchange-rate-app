import {Component, OnInit} from '@angular/core';
import {Exchange} from '../../../model/exchange/exchange';
import {NotificationService} from '../../../shared/services/notification/notification.service';
import {DataService} from '../../../shared/services/apiData/data.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Currency} from '../../../model/currency/currency';
import {timer} from 'rxjs';
import {concatMap, map} from 'rxjs/operators';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit {
  options: string[];
  exchange: Exchange;
  dataForm: FormGroup;
  value: string;

  constructor(private notificationService: NotificationService,
              private dataService: DataService) {
  }

  ngOnInit(): void {
    this.getKeysFromApi();
    this.dataForm = new FormGroup({
      selectedBase: new FormControl(null),
      selectedResult: new FormControl(null),
      selectedAmount: new FormControl(null, Validators.required)
    });
  }

  getKeysFromApi(): void {
    this.dataService.getAllData().subscribe((data: Exchange) => {
      this.exchange = data;
      this.options = Object.keys(this.exchange.rates);
      this.options.push('EUR');
      this.options.sort();
    });
  }

  calculateCurrency(): void {
    const base = this.dataForm.value.selectedBase;
    const result = this.dataForm.value.selectedResult;
    const amount = this.dataForm.value.selectedAmount;
    this.dataService.getSpecificExchange(base, result).subscribe(responseData => {
      this.exchange = Object(responseData);
      this.value = (Number(this.exchange.rates[result]) * amount).toFixed(2);

    });
  }
}
