import {Component, OnInit} from '@angular/core';
import {Currency} from '../../../model/currency/currency.module';
import {Observable, Subject, timer} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {concatMap, map} from 'rxjs/operators';
import {element} from 'protractor';

@Component({
  selector: 'app-british-pound-to-euro',
  templateUrl: './british-pound-to-euro.component.html',
  styleUrls: ['./british-pound-to-euro.component.css']
})
export class BritishPoundToEuroComponent implements OnInit {

  images = ['../../../assets/GBP.jpg', '../../../assets/CHF.jpg', '../../../assets/USD.jpg'];

  selectedBase: string;
  selectedRate: string;

  options = [
    {name: 'USD', value: 1},
    {name: 'EUR', value: 2},
    {name: 'JPY', value: 3},
    {name: 'GBP', value: 4},
    {name: 'CAD', value: 5},
    {name: 'CHF', value: 6}
  ];

  currencies: Currency[] = [
    {base: 'GBP', rate: 'EUR', img: '../../../assets/GBP.jpg', amount: new Observable()},
    {base: 'CHF', rate: 'USD', img: '../../../assets/CHF.jpg', amount: new Observable()},
    {base: 'USD', rate: 'GBP', img: '../../../assets/USD.jpg', amount: new Observable()}];

  currenciesAsync = [];


  // currency: Observable<number>;
  // currency2: Observable<number>;
  // currency3: Observable<number>;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    for (const currency of this.currencies) {
      currency.amount = (timer(0, 1000).pipe(
        concatMap(_ => (this.http.get(`https://api.exchangeratesapi.io/latest?base=${currency.base}&symbols=${currency.rate}`))),
        map((response: { 'rates': { 'CURRENCY': number } }) => response.rates[currency.rate]),
      ));
    }
  }

  addCurrency(): void {
    let counter = 0;
    const selectedBase = this.selectedBase;
    const selectedRate = this.selectedRate;
    const currency: Currency = {
      base: selectedBase, rate: selectedRate, img: `../../../assets/${selectedBase}.jpg`, amount: (timer(0, 1000).pipe(
        concatMap(_ => (this.http.get(`https://api.exchangeratesapi.io/latest?base=${selectedBase}&symbols=${selectedRate}`))),
        map((response: { 'rates': { 'CURRENCY': number } }) => response.rates[selectedRate]),
      ))
    };
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.currencies.length; i++) {
      if (this.currencies[i].base === currency.base && this.currencies[i].rate === currency.rate) {
        counter++;
      } else {
        console.log('SRR NO MATCH');
      }
    }
    // tslint:disable-next-line:prefer-for-of

    if (this.selectedBase === this.selectedRate || this.selectedBase === undefined || this.selectedRate === undefined || counter > 0) {
      alert('DUPA');
    } else {
      console.log(counter);
      this.currencies.push(currency);
    }
  }
}


// console.log(this.currenciesAsync);

// const gBPtoEUR = this.http.get('https://api.exchangeratesapi.io/latest?base=GBP&symbols=EUR');
// const cHFtoUSD = this.http.get('https://api.exchangeratesapi.io/latest?base=CHF&symbols=USD');
// const bPtoUSD = this.http.get('https://api.exchangeratesapi.io/latest?base=USD&symbols=GBP');
//
// this.currency = timer(0, 1000).pipe(
//   concatMap(_ => gBPtoEUR),
//   map((response: { rates: { EUR: number } }) => response.rates.EUR),
// );
//
// this.currency2 = timer(0, 1000).pipe(
//   concatMap(_ => cHFtoUSD),
//   map((response: { rates: { USD: number } }) => response.rates.USD),
// );
//
// this.currency3 = timer(0, 1000).pipe(
//   concatMap(_ => bPtoUSD),
//   map((response: { rates: { GBP: number } }) => response.rates.GBP),
// );
