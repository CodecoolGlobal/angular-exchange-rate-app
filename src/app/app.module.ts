import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
// import {DataService} from './services/data.service';
import {HttpClientModule} from '@angular/common/http';
import {CarouselComponent} from './modules/components/carousel/carousel.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {InputFormsComponent} from './modules/components/input-forms/input-forms.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {LineChartComponent} from './modules/components/line-chart/line-chart.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {CurrencyService} from './shared/services/currencyArray/currency.service';
import {NotificationService} from './shared/services/notification/notification.service';
import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './modules/components/home/home.component';
import { ConverterComponent } from './modules/components/converter/converter.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'converter', component: ConverterComponent},
  { path: 'carousel', component: CarouselComponent},
  { path: 'line', component: LineChartComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    CarouselComponent,
    InputFormsComponent,
    LineChartComponent,
    HomeComponent,
    ConverterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    SimpleNotificationsModule.forRoot(),
    BrowserAnimationsModule,
    NgxChartsModule,
    RouterModule.forRoot(appRoutes)
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
