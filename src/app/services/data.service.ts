import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {observable, Observable, Subscription} from 'rxjs';
import {Currency} from '../model/currency/currency.module';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  currency: Currency;
  currency2: Currency;
  currency3: Currency;


    constructor(private http: HttpClient) {
  }

  // tslint:disable-next-line:typedef
  getGBPtoEUR(): Subscription {
    return this.http.get<Currency>('https://api.exchangeratesapi.io/latest?base=GBP&symbols=EUR')
      .subscribe((data: Currency) => this.currency = data);
    console.log(this.currency);
  }

  getCHFtoUSD(): Subscription {
    return this.http.get<Currency>('https://api.exchangeratesapi.io/latest?base=CHF&symbols=USD')
      .subscribe((data: Currency) => this.currency2 = data);
    console.log(this.currency);
  }

  getUSDtoGBP(): Subscription {
    return this.http.get<Currency>('https://api.exchangeratesapi.io/latest?base=USD&symbols=GBP')
      .subscribe((data: Currency) => this.currency3 = data);
    console.log(this.currency);
  }
}
