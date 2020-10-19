// import {Injectable} from '@angular/core';
// import {HttpClient} from '@angular/common/http';
// import {map} from 'rxjs/operators';
// import {interval, observable, Observable, Subscription, timer} from 'rxjs';
// import {Currency} from '../model/currency/currency.module';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class DataService {
//
//   currency: Observable<Currency>;
//   currency2: Observable<Currency>;
//   currency3: Observable<Currency>;
//
//   gBPtoEUR = this.http.get('https://blockchain.info/ticker');
//
//   trigger = timer(0, 1000);
//
//   private obsCurrency: Observable<Currency>;
//
//     constructor(private http: HttpClient) {
//   }
//
//   // tslint:disable-next-line:typedef
//   getGBPtoEUR(): Subscription {
//     return this.http.get<Currency>('https://api.exchangeratesapi.io/latest?base=GBP&symbols=EUR')
//       .subscribe((data: Currency) => this.currency = data);
//     console.log(this.currency);
//   }
//
//   getCHFtoUSD(): Subscription {
//     return this.http.get<Currency>('https://api.exchangeratesapi.io/latest?base=CHF&symbols=USD')
//       .subscribe((data: Currency) => this.currency2 = data);
//     console.log(this.currency);
//   }
//
//   getUSDtoGBP(): Subscription {
//     return this.http.get<Currency>('https://api.exchangeratesapi.io/latest?base=USD&symbols=GBP')
//       .subscribe((data: Currency) => this.currency3 = data);
//     console.log(this.currency);
//   }
// }
