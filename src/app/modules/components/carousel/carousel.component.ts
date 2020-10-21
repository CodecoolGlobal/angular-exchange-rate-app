import {Component, OnInit} from '@angular/core';
import {Currency} from '../../../model/currency/currency';
import {Observable, timer} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {concatMap, map} from 'rxjs/operators';
import {DataService} from '../../../services/data.service';

@Component({
  selector: 'app-british-pound-to-euro',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})

export class CarouselComponent implements OnInit {
  currencies: Currency[] = [
    {base: 'GBP', result: 'EUR', img: '../../../assets/GBP.jpg', amount: new Observable()},
    {base: 'CHF', result: 'USD', img: '../../../assets/CHF.jpg', amount: new Observable()},
    {base: 'USD', result: 'GBP', img: '../../../assets/USD.jpg', amount: new Observable()}];

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    for (const currency of this.currencies) {
      currency.amount = (timer(0, 1000).pipe(
        concatMap(_ => (this.dataService.getSpecificExchange(currency.base, currency.result))),
        map((response: { 'rates': { 'CURRENCY': number } }) => response.rates[currency.result]),
      ));
    }
  }

  onCurrencyAdded(currency: { base: string, result: string }): void {
    if (this.isInCurrencies(this.currencies, currency.base, currency.result)) {
      this.currencies.push({
        base: currency.base, result: currency.result, img: `../../../assets/${currency.base}.jpg`, amount: (timer(0, 1000).pipe(
          concatMap(_ => (this.dataService.getSpecificExchange(currency.base, currency.result))),
          map((response: { 'rates': { 'CURRENCY': number } }) => response.rates[currency.result]),
        ))
      });
    }
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
