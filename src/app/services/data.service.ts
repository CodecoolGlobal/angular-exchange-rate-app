import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {interval, observable, Observable, Subscription, timer} from 'rxjs';
import {Currency} from '../model/currency/currency';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
  }

  getSpecificExchange(base, result): Observable<object> {
    return this.http.get(`https://api.exchangeratesapi.io/latest?base=${base}&symbols=${result}`);
  }

  getAllData(): Observable<object> {
    return this.http.get(`https://api.exchangeratesapi.io/latest`);
  }

  getDataFromTo(base, result, start, end): Observable<object> {
    console.log(this.http.get(`https://api.exchangeratesapi.io/history?start_at=${start}&end_at=${end}&symbols=${result}&base=${base}`));
    return this.http.get(`https://api.exchangeratesapi.io/history?start_at=${start}&end_at=${end}&symbols=${result}&base=${base}`);
  }
}
