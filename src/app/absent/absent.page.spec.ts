import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsentPage } from './absent.page';

describe('AbsentPage', () => {
  let component: AbsentPage;
  let fixture: ComponentFixture<AbsentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbsentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
