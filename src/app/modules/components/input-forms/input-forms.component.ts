import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {NotificationService} from '../../../shared/services/notification/notification.service';
import {CurrencyService} from '../../../shared/services/currencyArray/currency.service';
import {Exchange} from '../../../model/exchange/exchange';
import {CurrenciesComponent} from '../../../shared/components/currencies/currencies.component';

@Component({
  selector: 'app-input-forms',
  templateUrl: './input-forms.component.html',
  styleUrls: ['./input-forms.component.css'],
  providers: [CurrencyService, NotificationService]
})

export class InputFormsComponent {
  exchange: Exchange;

  @Output() currencyCreated = new EventEmitter<{ base: string, result: string, img: string }>();
  @Output() currencyRemoved = new EventEmitter<{ base: string, result: string }>();

  @ViewChild('fromToCurrencies') fromToContent: CurrenciesComponent;
  @ViewChild('imgUrl') imgUrl: ElementRef;

  constructor(private notificationService: NotificationService) {
  }

  onAddCurrency(): void {
    this.notificationService.showErrorNotifications('INPUTS CANNOT HAVE THE SAME VALUE!');
    const fromTo = this.fromToContent.currenciesForm.value;
    const from = fromTo.selectedFrom;
    const to = fromTo.selectedTo;
    const pattern = this.getUrlFormat();
    if (from === to) {
      this.notificationService.showErrorNotifications('INPUTS CANNOT HAVE THE SAME VALUE!');
    } else if (!pattern.test(this.imgUrl.nativeElement.value)) {
      this.notificationService.showErrorNotifications('INVALID URL!');
    } else {
      this.currencyCreated.emit({base: from, result: to, img: this.imgUrl.nativeElement.value});
    }
  }

  onRemoveCurrency(): void {
    const fromTo = this.fromToContent.currenciesForm.value;
    if (fromTo.selectedFrom === fromTo.selectedTo) {
      this.notificationService.showErrorNotifications('INPUTS CANNOT HAVE THE SAME VALUE!');
    } else {
      this.currencyRemoved.emit({base: fromTo.selectedFrom, result: fromTo.selectedTo});
    }
  }

  getUrlFormat(): RegExp {
    return new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  }
}
