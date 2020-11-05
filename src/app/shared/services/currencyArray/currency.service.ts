import {EventEmitter, Injectable} from '@angular/core';
import {Currency} from '../../../model/currency/currency';
import {Observable, timer} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {concatMap, map} from 'rxjs/operators';
import {DataService} from '../apiData/data.service';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient, private dataService: DataService) {
  }

  private currencies: Currency[] = [];
  //   [{base: 'GBP', result: 'EUR', img: '../../../assets/GBP.jpg', amount: new Observable()},
  //   {base: 'CHF', result: 'USD', img: '../../../assets/CHF.jpg', amount: new Observable()},
  //   {base: 'USD', result: 'GBP', img: '../../../assets/USD.jpg', amount: new Observable()}];

  getCurrencies(): Currency[] {
    this.http.get('https://currencies-635ed.firebaseio.com/.json').subscribe(currencies => {
      // console.log(typeof Object(currencies));
      const currenciesObject = Object(currencies);
      for (let i = 0; i < 3; i++) {
        this.currencies[i] = {
          base: currenciesObject[i].base,
          img: currenciesObject[i].img,
          result: currenciesObject[i].result,
          amount: (timer(0, 1000).pipe(
            concatMap(_ => (this.dataService.getSpecificExchange(this.currencies[i].base, this.currencies[i].result))),
            map((response: { 'rates': { 'CURRENCY': number } }) => response.rates[this.currencies[i].result]),
          ))
        };
      }
    });
    return this.currencies;
  }

  addCurrency(currency: Currency): void {
    this.currencies.push(currency);
  }
}
