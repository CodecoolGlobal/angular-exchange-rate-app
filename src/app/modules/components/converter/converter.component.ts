import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Exchange} from '../../../model/exchange/exchange';
import {NotificationService} from '../../../shared/services/notification/notification.service';
import {DataService} from '../../../shared/services/apiData/data.service';
import {CurrenciesComponent} from '../../../shared/components/currencies/currencies.component';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent {
  options: string[];
  exchange: Exchange;
  value: string;
  @ViewChild('fromToContent') fromToContent: CurrenciesComponent;
  @ViewChild('amount') amount: ElementRef;

  constructor(private notificationService: NotificationService,
              private dataService: DataService) {
  }

  calculateCurrency(): void {
    const inputs = this.fromToContent.currenciesForm.value;
    const base = inputs.selectedFrom;
    const result = inputs.selectedTo;
    const amount = this.amount.nativeElement.value;
    this.dataService.getSpecificExchange(base, result).subscribe(responseData => {
      this.exchange = Object(responseData);
      this.value = (Number(this.exchange.rates[result]) * amount).toFixed(2);
    });
  }
}
