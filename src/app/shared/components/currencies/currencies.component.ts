import {Component, OnInit} from '@angular/core';
import {Exchange} from '../../../model/exchange/exchange';
import {FormControl, FormGroup} from '@angular/forms';
import {NotificationService} from '../../services/notification/notification.service';
import {DataService} from '../../services/apiData/data.service';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.css']
})
export class CurrenciesComponent implements OnInit {
  options: string[];
  exchange: Exchange;
  currenciesForm: FormGroup;

  constructor(private notificationService: NotificationService,
              private dataService: DataService) {
  }

  ngOnInit(): void {
    this.getKeysFromApi();
    this.currenciesForm = new FormGroup({
      selectedFrom: new FormControl(null),
      selectedTo: new FormControl(null),
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
}

