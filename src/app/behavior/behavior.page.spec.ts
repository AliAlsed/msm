import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BehaviorPage } from './behavior.page';

describe('BehaviorPage', () => {
  let component: BehaviorPage;
  let fixture: ComponentFixture<BehaviorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BehaviorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BehaviorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
