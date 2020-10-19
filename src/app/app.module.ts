import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
// import {DataService} from './services/data.service';
import {HttpClientModule} from '@angular/common/http';
import { BritishPoundToEuroComponent } from './modules/components/british-pound-to-euro/british-pound-to-euro.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    BritishPoundToEuroComponent
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
