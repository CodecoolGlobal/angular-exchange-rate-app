import {EventEmitter, Injectable} from '@angular/core';
import {Currency} from '../../../model/currency/currency';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  currencyCreated = new EventEmitter<{ base: string, result: string, img: string }>();

  private currencies: Currency[] = [
    {base: 'GBP', result: 'EUR', img: '../../../assets/GBP.jpg', amount: new Observable()},
    {base: 'CHF', result: 'USD', img: '../../../assets/CHF.jpg', amount: new Observable()},
    {base: 'USD', result: 'GBP', img: '../../../assets/USD.jpg', amount: new Observable()}];

  getCurrencies(): Currency[] {
    return this.currencies.slice();
  }

  addCurrency(currency: Currency): void {
    this.currencies.push(currency);
  }
}
