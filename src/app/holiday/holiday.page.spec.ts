import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayPage } from './holiday.page';

describe('HolidayPage', () => {
  let component: HolidayPage;
  let fixture: ComponentFixture<HolidayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HolidayPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
