import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NEWPage } from './new.page';

describe('NEWPage', () => {
  let component: NEWPage;
  let fixture: ComponentFixture<NEWPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NEWPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NEWPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
