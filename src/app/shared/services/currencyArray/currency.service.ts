import {Injectable, OnDestroy} from '@angular/core';
import {Currency} from '../../../model/currency/currency';
import {Subscription, timer} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {concatMap, map} from 'rxjs/operators';
import {DataService} from '../apiData/data.service';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService implements OnDestroy {
  currencyQuery: Subscription;

  constructor(private http: HttpClient, private dataService: DataService) {
  }

  private currencies: Currency[] = [];

  getCurrencies(): Currency[] {
    this.currencyQuery = this.http.get('https://currencies-635ed.firebaseio.com/.json').subscribe(currencies => {
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

  ngOnDestroy(): void {
    this.currencyQuery.unsubscribe();
  }
}
