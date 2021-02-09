import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailverifyPage } from './emailverify.page';

describe('EmailverifyPage', () => {
  let component: EmailverifyPage;
  let fixture: ComponentFixture<EmailverifyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailverifyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailverifyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
