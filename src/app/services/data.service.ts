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


    constructor(private http: HttpClient) {
  }

  // tslint:disable-next-line:typedef
  getGBPtoEUR(): Subscription {
    return this.http.get<Currency>('https://api.exchangeratesapi.io/latest?base=GBP&symbols=EUR')
      .subscribe((data: Currency) => this.currency = data);
    console.log(this.currency);
  }

  // getGBPtoEUR(): Observable<any> {
  //   return this.http.get('https://api.exchangeratesapi.io/latest?base=CHF&symbols=USD').pipe(map(result => this.result = result));
  // }
  //
  // getGBPtoEUR(): Observable<any> {
  //   return this.http.get('https://api.exchangeratesapi.io/latest?base=USD&symbols=GBP').pipe(map(result => this.result = result));
  // }
}
