import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {CarouselComponent} from './modules/components/carousel/carousel.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputFormsComponent} from './modules/components/input-forms/input-forms.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {LineChartComponent} from './modules/components/line-chart/line-chart.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './modules/components/home/home.component';
import {ConverterComponent} from './modules/components/converter/converter.component';
import {CurrenciesComponent} from './shared/components/currencies/currencies.component';
import {DateComponent} from './shared/components/date/date.component';

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
    CurrenciesComponent,
    DateComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SimpleNotificationsModule.forRoot(),
    BrowserAnimationsModule,
    NgxChartsModule,
    RouterModule.forRoot(appRoutes),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
