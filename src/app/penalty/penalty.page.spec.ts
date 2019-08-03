import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PenaltyPage } from './penalty.page';

describe('PenaltyPage', () => {
  let component: PenaltyPage;
  let fixture: ComponentFixture<PenaltyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PenaltyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenaltyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
