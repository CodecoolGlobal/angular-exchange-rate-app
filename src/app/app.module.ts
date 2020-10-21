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

@NgModule({
  declarations: [
    AppComponent,
    CarouselComponent,
    InputFormsComponent,
    CarouselItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  // providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
