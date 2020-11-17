import { Component } from '@angular/core';
import {CurrencyService} from './shared/services/currencyArray/currency.service';
import {NotificationService} from './shared/services/notification/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CurrencyService, NotificationService]
})
export class AppComponent {
  isNavbarCollapsed = true;
}
