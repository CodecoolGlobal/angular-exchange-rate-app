import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {InputFormsComponent} from '../../../modules/components/input-forms/input-forms.component';

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
