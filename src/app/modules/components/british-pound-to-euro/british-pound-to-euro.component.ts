import { Component, OnInit } from '@angular/core';
import {DataService} from '../../../services/data.service';
import {Currency} from '../../../model/currency/currency.module';

@Component({
  selector: 'app-british-pound-to-euro',
  templateUrl: './british-pound-to-euro.component.html',
  styleUrls: ['./british-pound-to-euro.component.css']
})
export class BritishPoundToEuroComponent implements OnInit {

  images = ['../../../assets/uk.jpg', '../../../assets/sw.jpg', '../../../assets/us.jpg'];

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getGBPtoEUR();
    this.dataService.getCHFtoUSD();
    this.dataService.getUSDtoGBP();
  }
}
