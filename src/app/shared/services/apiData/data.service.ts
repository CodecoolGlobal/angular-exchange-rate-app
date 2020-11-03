import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

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
    return this.http.get(`https://api.exchangeratesapi.io/history?start_at=${start}&end_at=${end}&symbols=${result}&base=${base}`);
  }
}
