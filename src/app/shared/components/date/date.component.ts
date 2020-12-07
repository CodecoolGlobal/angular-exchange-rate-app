import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {
  @ViewChild('selectDate') selectDate: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

}
