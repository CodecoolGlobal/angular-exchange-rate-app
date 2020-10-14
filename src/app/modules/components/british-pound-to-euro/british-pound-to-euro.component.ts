import { Component, OnInit } from '@angular/core';
import {DataService} from '../../../services/data.service';
import {Currency} from '../../../model/currency/currency.module';

@Component({
  selector: 'app-british-pound-to-euro',
  templateUrl: './british-pound-to-euro.component.html',
  styleUrls: ['./british-pound-to-euro.component.css']
})
export class BritishPoundToEuroComponent implements OnInit {

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getGBPtoEUR();
  }
}
