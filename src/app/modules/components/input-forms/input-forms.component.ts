import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DataService} from '../../../shared/services/apiData/data.service';
import {NotificationService} from '../../../shared/services/notification/notification.service';
import {CurrencyService} from '../../../shared/services/currencyArray/currency.service';
import {Exchange} from '../../../model/exchange/exchange';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-input-forms',
  templateUrl: './input-forms.component.html',
  styleUrls: ['./input-forms.component.css'],
  providers: [CurrencyService, NotificationService]
})

export class InputFormsComponent implements OnInit {
  options: string[];
  exchange: Exchange;

  @Output() currencyCreated = new EventEmitter<{ base: string, result: string, img: string }>();
  @Output() currencyRemoved = new EventEmitter<{ base: string, result: string }>();

  @ViewChild('f', { static: false }) signupForm: NgForm;

  constructor(private notificationService: NotificationService,
              private dataService: DataService) {
  }

  ngOnInit(): void {
    this.getKeysFromApi();
  }

  onAddCurrency(): void {
    const dupa = this.signupForm.value;
    const pattern = this.getUrlFormat();
    if (dupa.selectedBase === dupa.selectedResult) {
      this.notificationService.showErrorNotifications('INPUTS CANNOT HAVE THE SAME VALUE!');
    } else if (!pattern.test(dupa.selectedImgUrl)) {
      this.notificationService.showErrorNotifications('INVALID URL!');
    } else {
      this.currencyCreated.emit({base: dupa.selectedBase, result: dupa.selectedResult, img: dupa.selectedImgUrl});
    }
  }

  onRemoveCurrency(): void {
    const dupa = this.signupForm.value;
    if (dupa.selectedBase === dupa.selectedResult) {
      this.notificationService.showErrorNotifications('INPUTS CANNOT HAVE THE SAME VALUE!');
    } else {
      this.currencyRemoved.emit({base: dupa.selectedBase, result: dupa.selectedResult});
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

  getKeysFromApi(): void {
    this.dataService.getAllData().subscribe((data: Exchange) => {
      this.exchange = data;
      this.options = Object.keys(this.exchange.rates);
      this.options.push('EUR');
      this.options.sort();
    });
  }
}
