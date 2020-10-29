import {Component, OnInit} from '@angular/core';
import {Currency} from '../../../model/currency/currency';
import {timer} from 'rxjs';
import {concatMap, map} from 'rxjs/operators';
import {DataService} from '../../../shared/services/apiData/data.service';
import {CurrencyService} from '../../../shared/services/currencyArray/currency.service';
import {NotificationService} from '../../../shared/services/notification/notification.service';

@Component({
  selector: 'app-british-pound-to-euro',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})

export class CarouselComponent implements OnInit {
  currencies: Currency[];

  constructor(private notificationService: NotificationService,
              private dataService: DataService,
              private currencyService: CurrencyService) {
    this.currencies = currencyService.getCurrencies();
  }

  ngOnInit(): void {
    for (const currency of this.currencies) {
      currency.amount = (timer(0, 1000).pipe(
        concatMap(_ => (this.dataService.getSpecificExchange(currency.base, currency.result))),
        map((response: { 'rates': { 'CURRENCY': number } }) => response.rates[currency.result]),
      ));
    }
  }

  onCurrencyAdded(currency: { base: string, result: string, img: string }): void {
    if (this.isInCurrencies(this.currencies, currency.base, currency.result)) {
      this.notificationService.showSuccessNotification('ADDING WAS A SUCCESS!');
      this.currencies.push({
        base: currency.base, result: currency.result, img: currency.img, amount: (timer(0, 1000).pipe(
          concatMap(_ => (this.dataService.getSpecificExchange(currency.base, currency.result))),
          map((response: { 'rates': { 'CURRENCY': number } }) => response.rates[currency.result]),
        ))
      });
    } else {
      this.notificationService.showWarningNotification('URL IS VALID BUT DOES NOT RETRIEVE ANYTHING!');
    }
  }

  onCurrencyRemoved(currency: { base: string, result: string }): void {
    this.currencies = this.currencies.filter(({base, result}) => base !== currency.base && result !== currency.result);
  }

  isInCurrencies(currencies, base, result): boolean {
    let counter = 0;
    for (const currency of currencies) {
      if (currency.base === base && currency.result === result) {
        counter++;
      }
    }
    return counter === 0;
  }
}
