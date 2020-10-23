import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
// import {DataService} from './services/data.service';
import {HttpClientModule} from '@angular/common/http';
import { CarouselComponent } from './modules/components/carousel/carousel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import { InputFormsComponent } from './modules/components/input-forms/input-forms.component';
import { CarouselItemComponent } from './modules/components/carousel-item/carousel-item.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SimpleNotificationsModule} from 'angular2-notifications';
import { LineChartComponent } from './modules/components/line-chart/line-chart.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    AppComponent,
    CarouselComponent,
    InputFormsComponent,
    CarouselItemComponent,
    LineChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    SimpleNotificationsModule.forRoot(),
    BrowserAnimationsModule,
    NgxChartsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
