import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BritishPoundToEuroComponent } from './british-pound-to-euro.component';

describe('BritishPoundToEuroComponent', () => {
  let component: BritishPoundToEuroComponent;
  let fixture: ComponentFixture<BritishPoundToEuroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BritishPoundToEuroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BritishPoundToEuroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
