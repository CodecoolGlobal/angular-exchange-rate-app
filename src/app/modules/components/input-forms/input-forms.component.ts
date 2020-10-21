import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {Currency} from '../../../model/currency/currency';
import {Observable, pipe, timer} from 'rxjs';
import {concatMap, count, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {DataService} from '../../../services/data.service';
import {Option} from '../../../model/option/option';

@Component({
  selector: 'app-input-forms',
  templateUrl: './input-forms.component.html',
  styleUrls: ['./input-forms.component.css']
})
export class InputFormsComponent implements OnInit {
  options: Option[];
  @Output() currencyCreated = new EventEmitter<{ base: string, result: string }>();

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    console.log(this.getAllCurrencies());
  }

  onAddCurrency(baseInput: HTMLSelectElement, resultInput: HTMLSelectElement): void {
    if (!(baseInput.value === resultInput.value)) {
      this.currencyCreated.emit({base: baseInput.value, result: resultInput.value});
    }
  }

  getAllCurrencies(): object {
    return pipe(map((response: { 'rates': { } }) => response.rates),
    );
  }
}

// onCurrencyAdded(currency: { base: string, result: string }): void {
//   if (this.isInCurrencies(this.currencies, currency.base, currency.result)) {
//   this.currencies.push({
//     base: currency.base, result: currency.result, img: `../../../assets/${currency.base}.jpg`, amount: (timer(0, 1000).pipe(
//       concatMap(_ => (this.dataService.getSpecificExchange(currency.base, currency.result))),
//       map((response: { 'rates': { 'CURRENCY': number } }) => response.rates[currency.result]),
//     ))
//   });
// }
// }
